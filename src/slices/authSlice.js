import { createAction, createReducer } from "@reduxjs/toolkit";
import { setAuthToken } from "../handlers/cookieHandler";
import Axios from "axios";

const name = "auth/";
const postPending = createAction(name + "postPending");
const postError = createAction(name + "postError");
const postSuccess = createAction(name + "postSuccess");


export const authReducer = createReducer(
  { isLogged: false, sucessMsg: "" },
  {
    [postSuccess]: (state, action) => {
      state.isLogged = true;
      state.sucessMsg = action.payload.statusText;
      setAuthToken(action.payload.data);
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

// SELECTORS
export const loggedInSelector = state => {
  return state.isLogged;
};
