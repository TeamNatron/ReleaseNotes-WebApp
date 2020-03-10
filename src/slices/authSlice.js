import { createAction, createReducer } from "@reduxjs/toolkit";
import { setAuthToken, getAuthToken } from "../handlers/cookieHandler";
import Axios from "axios";

const name = "auth/";
const postPending = createAction(name + "postPending");
const postError = createAction(name + "postError");
const postSuccess = createAction(name + "postSuccess");

const checkLoggedInPending = createAction(name + "checkLoggedInPending");
const checkLoggedInError = createAction(name + "checkLoggedInError");
const checkLoggedInSuccess = createAction(name + "checkLoggedInSuccess");

export const authReducer = createReducer(
  { isLogged: false, sucessMsg: "" },
  {
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
    }
  }
);

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
        ["Access-Control-Request-Headers"]: "Content-Type"
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

export const checkLoggedIn = () => async dispatch => {
  dispatch(checkLoggedInPending());
  if (getAuthToken()) {
    dispatch(checkLoggedInSuccess());
    return;
  }
  dispatch(checkLoggedInError());
};

// SELECTORS
export const loggedInSelector = state => {
  return state.auth.isLogged;
};
