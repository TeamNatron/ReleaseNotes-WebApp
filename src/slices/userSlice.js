import { createAction, createReducer } from "@reduxjs/toolkit";
import { getAuthToken } from "../handlers/cookieHandler";
import Axios from "axios";

export const name = "user/";
export const getPending = createAction(name + "getPending");
export const getSuccess = createAction(name + "getSuccess");
export const getError = createAction(name + "getError");

export const putPending = createAction(name + "putPending");
export const putSuccess = createAction(name + "putSuccess");
export const putError = createAction(name + "putError");

export const postPending = createAction(name + "postPending");
export const postSuccess = createAction(name + "postSuccess");
export const postError = createAction(name + "postError");

// REDUCER
const initialState = {
  items: [],
};
export const userReducer = createReducer(initialState, {
  [getSuccess]: (state, action) => {
    state.items = action.payload;
  },
});

// Thunk for fetching
export const fetchUsers = () => (dispatch) => {
  dispatch(getPending());
  Axios.get("/users")
    .then((res) => {
      dispatch(getSuccess(res.data));
    })
    .catch((error) => {
      dispatch(getError(error));
    });
};

export const registerNewUser = (paramEmail, paramPassword) => {
  return Axios.post("users", {
    email: paramEmail,
    password: paramPassword,
  });
};

export const changePassword = (paramPassword, id) => async (dispatch) => {
  dispatch(putPending());

  Axios.put(
    "users/" + id,
    {
      password: paramPassword,
    },
    {
      withCredentials: false,
      headers: {
        "Access-Control-Request-Headers": "Content-Type",
        Authorization: "Bearer " + getAuthToken(),
      },
    }
  )
    .then((res) => {
      dispatch(putSuccess({ successMsg: res.data }));
    })
    .catch((err) => {
      dispatch(putError(err));
    });
};
