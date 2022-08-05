import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokenStatus: "void",
  dataStatus: "void",
  token: null,
  data: null,
  tokenError: null,
  dataError: null,
  rememberMe: false,
};

export const {actions, reducer} = createSlice({
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
    editProfil: {
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