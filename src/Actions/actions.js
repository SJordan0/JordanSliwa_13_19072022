import { actions } from "../Slice/user";
import { selectUser } from "../Utils/selectors";

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
      const response = await fetch("http://localhost:3001/api/v1/user/login",optionsToken);
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
    const requestForProfilHeaders = {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile",requestForProfilHeaders);
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
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
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
  
  export async function editProfil(store, firstName, lastName, token) {
    const optionsEditProfil = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName }),
    };
    try {
      await fetch("http://localhost:3001/api/v1/user/profile",optionsEditProfil);
      store.dispatch(actions.editProfil(firstName, lastName));
    } catch (error) {
      store.dispatch(actions.dataRejected(error));
    }
  }
  