import { createAction, createReducer } from "@reduxjs/toolkit";
import Axios from "axios";

export const name = "user/";
export const getPending = createAction(name + "getPending");
export const getSuccess = createAction(name + "getSuccess");
export const getError = createAction(name + "getError");

// REDUCER
const initialState = {
  items: []
};
export const userReducer = createReducer(initialState, {
  [getSuccess]: (state, action) => {
    state.items = action.payload;
  }
});

// Thunk for fetching
export const fetchUsers = () => dispatch => {
  dispatch(getPending());
  Axios.get("/users")
    .then(res => {
      dispatch(getSuccess(res.data));
    })
    .catch(error => {
      dispatch(getError(error));
    });
};
