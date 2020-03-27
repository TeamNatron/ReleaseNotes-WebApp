import { createAction, createReducer } from "@reduxjs/toolkit";
import {
  setAuthToken,
  getAuthToken,
  removeAuthToken
} from "../handlers/cookieHandler";
import Axios from "axios";

const name = "auth/";
export const postPending = createAction(name + "postPending");
export const postError = createAction(name + "postError");
export const postSuccess = createAction(name + "postSuccess");

export const putPending = createAction(name + "putPending");
export const putSuccess = createAction(name + "putSuccess");
export const putError = createAction(name + "putError");

export const checkLoggedInPending = createAction(name + "checkLoggedInPending");
export const checkLoggedInError = createAction(name + "checkLoggedInError");
export const checkLoggedInSuccess = createAction(name + "checkLoggedInSuccess");

export const logoutPending = createAction(name + "logoutPending");
export const logoutError = createAction(name + "logoutError");
export const logoutSuccess = createAction(name + "logoutSuccess");

const initialState = {
  isLogged: false,
  sucessMsg: "",
  currentUser: {
    id: -1,
    email: "",
    AzureUserId: "",
    AzurePat: "",
    AzureOrganization: ""
  }
};

export const authReducer = createReducer(initialState, {
  [postSuccess]: (state, action) => {
    state.isLogged = true;
    state.sucessMsg = action.payload.statusText;
    setAuthToken(action.payload.data);
  },
  [checkLoggedInSuccess]: (state, action) => {
    state.isLogged = true;
  },
  [checkLoggedInError]: state => {
    state.isLogged = false;
  },
  [logoutSuccess]: state => {
    state.isLogged = false;
  },
  [putSuccess]: (state, action) => {
    state.currentUser.id = action.payload.data.id;
    state.currentUser.email = action.payload.data.email;
    state.currentUser.AzureUserId = action.payload.data.UserId;
    state.currentUser.AzurePat = action.payload.data.Pat;
    state.currentUser.AzureOrganization = action.payload.data.Organization;
    state.sucessMsg = action.payload.statusText;
  }
});

// THUNKS
export const login = (paramEmail, paramPassword) => async dispatch => {
  dispatch(postPending());
  Axios.post(
    "login",
    {
      email: paramEmail,
      password: paramPassword
    },
    {
      withCredentials: false,
      headers: {
        "Access-Control-Request-Headers": "Content-Type"
      }
    }
  )
    .then(res => {
      dispatch(postSuccess({ data: res.data, statusText: res.statusText }));
    })
    .catch(err => {
      dispatch(postError(err));
    });
};

export const logout = () => async dispatch => {
  dispatch(logoutPending);

  try {
    removeAuthToken();
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutError(err));
  }
};

export const checkLoggedIn = () => async dispatch => {
  dispatch(checkLoggedInPending());
  if (getAuthToken()) {
    dispatch(checkLoggedInSuccess());
    return;
  }
  dispatch(checkLoggedInError());
};

// Thunk for update azure info
export const updateAzureInfo = () => async dispatch => {
  dispatch(putPending());
  Axios.put("/users")
    .then(res => {
      dispatch(putSuccess({ data: res.data, statusText: res.statusText }));
    })
    .catch(err => {
      dispatch(putError(err));
    });
};

// SELECTORS
export const loggedInSelector = state => {
  return state.auth.isLogged;
};
