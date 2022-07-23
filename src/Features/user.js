import { createSlice } from "@reduxjs/toolkit";
import { selectUser } from "../Utils/selectors";

const initialState = {
  tokenStatus: "void",
  dataStatus: "void",
  token: null,
  data: null,
  tokenError: null,
  dataError: null,
  rememberMe: false,
};

export async function fetchOrUpdateToken(store, email, password) {
  const tokenStatus = selectUser(store.getState()).tokenStatus;
  const rememberMeValue = selectUser(store.getState()).rememberMe;
  if (tokenStatus === "pending" || tokenStatus === "updating") {
    return;
  }
  store.dispatch(actions.tokenFetching());
  const optionsToken = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };
  try {
    const response = await fetch(
      "http://localhost:3001/api/v1/user/login",
      optionsToken
    );
    const res = await response.json();
    store.dispatch(actions.tokenResolved(res.body.token));
    if (rememberMeValue) {
      localStorage.setItem("token", res.body.token);
      sessionStorage.setItem("token", res.body.token);
    }
    return res.body.token;
  } catch (error) {
    console.log(typeof error);
    store.dispatch(actions.tokenRejected(error));
    return null;
  }
}

export async function fetchOrUpdateData(store, token) {
  if (token === null) {
    return;
  }
  const dataStatus = selectUser(store.getState()).dataStatus;
  if (dataStatus === "pending" || dataStatus === "updating") {
    return;
  }
  store.dispatch(actions.dataFetching());
  const requestForProfileHeaders = {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await fetch(
      "http://localhost:3001/api/v1/user/profile",
      requestForProfileHeaders
    );
    const res = await response.json();
    if (res.status === 401) {
      signOut(store);
      return;
    }
    store.dispatch(actions.dataResolved(res.body));
  } catch (error) {
    store.dispatch(actions.dataRejected(error));
  }
}

export function checkStorageToken(store) {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    store.dispatch(actions.tokenFetching());
    store.dispatch(actions.tokenResolved(token));
    fetchOrUpdateData(store, token);
    store.dispatch(actions.remember());
  }
}

export function signOut(store) {
  store.dispatch(actions.logout());
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
}

export function rememberMe(store) {
  store.dispatch(actions.remember());
}

export async function editProfile(store, firstName, lastName, token) {
  const optionsEditProfile = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ firstName, lastName }),
  };
  try {
    await fetch(
      "http://localhost:3001/api/v1/user/profile",
      optionsEditProfile
    );
    store.dispatch(actions.editProfile(firstName, lastName));
  } catch (error) {
    store.dispatch(actions.dataRejected(error));
  }
}

const {actions, reducer} = createSlice({
  name: "user",
  initialState,
  reducers: {
    tokenFetching: (draft) => { 
      if (draft.tokenStatus === "void") {
        draft.tokenStatus = "pending";
        return;
      }
      if (draft.tokenStatus === "rejected") {
        draft.tokenStatus = "pending";
        draft.tokenError = null;
        return;
      }
      if (draft.tokenStatus === "resolved") {
        draft.tokenStatus = "updating";
        return;
      }
      return;
    },
    tokenResolved: (draft, action) => {
        if (draft.tokenStatus === "pending" || draft.tokenStatus === "updating") {
          draft.tokenStatus = "resolved";
          draft.token = action.payload;
          return;
        }
    },
    tokenRejected: {
      prepare: (tokenError) => ({
        payload: {tokenError},
      }),
      reducer: (draft, action) => {
        if (draft.tokenStatus === "pending" ||draft.tokenStatus === "updating") {
          draft.tokenStatus = "rejected";
          draft.tokenError = action.payload.message;
          draft.token = null;
          return;
        }
      }
    },
    dataFetching: (draft) => {
      if (draft.dataStatus === "void") {
        draft.dataStatus = "pending";
        return;
      }
      if (draft.dataStatus === "rejected") {
        draft.dataStatus = "pending";
        draft.dataError = null;
        return;
      }
      if (draft.dataStatus === "resolved") {
        draft.dataStatus = "updating";
        return;
      }
      return;
    },
    dataResolved: (draft, action) => {
        if (draft.dataStatus === "pending" || draft.dataStatus === "updating") {
          draft.dataStatus = "resolved";
          draft.data = action.payload;
          return;
        }
    },
    dataRejected: {
      prepare: (dataError) => ({
        payload: {dataError},
      }),
      reducer: (draft, action) => {
        if (draft.dataStatus === "pending" || draft.dataStatus === "updating") {
          draft.dataStatus = "rejected";
          draft.dataError = action.payload.message;
          draft.data = null;
          return;
        }
      }
    },
    logout: (draft) => {
      draft.tokenStatus = "void";
        draft.dataStatus = "void";
        draft.token = null;
        draft.data = null;
        draft.tokenError = null;
        draft.dataError = null;
        draft.rememberMe = false;
        return;
    },
    remember: (draft) => {
      if (draft.token) {
        draft.rememberMe = true;
        return;
      }
      draft.rememberMe = !draft.rememberMe;
      return;
    },
    editProfile: {
      prepare: (firstName, lastName) => ({
        payload: {firstName, lastName},
      }),
      reducer: (draft, action) => {
        draft.data.firstName = action.payload.firstName;
        draft.data.lastName = action.payload.lastName;
        return;
      }
    }
  }
})


export default reducer
