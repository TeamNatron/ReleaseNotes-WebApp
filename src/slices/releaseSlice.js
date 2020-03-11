import { createReducer, createAction } from "@reduxjs/toolkit";
import Axios from "axios";

// ACTIONS
export const name = "release/";
export const getPending = createAction(name + "getPending");
export const getSuccess = createAction(name + "getSuccess");
export const getError = createAction(name + "getError");

export const getByIdSuccess = createAction(name + "getByIdSuccess");
export const getByIdError = createAction(name + "getByIdError");
export const getByIdPending = createAction(name + "getByIdPending");

export const putByIdPending = createAction(name + "putByIdPending");
export const putByIdSuccess = createAction(name + "putByIdSuccess");
export const putByIdError = createAction(name + "putByIdError");

export const postPending = createAction(name + "postPending");
export const postError = createAction(name + "postError");
export const postSuccess = createAction(name + "postSuccess");

// REDUCER
const initialState = {
  pending: false,
  error: "",
  items: [],
  successMsg: ""
};
export const releaseReducer = createReducer(initialState, {
  [getSuccess]: (state, action) => {
    state.items = action.payload;
  },
  [getByIdSuccess]: (state, action) => {
    updateInArray(state, action);
  },
  [putByIdSuccess]: (state, action) => {
    updateInArray(state, action);
    state.successMsg = action.payload.response;
  },
  [postSuccess]: (state, action) => {
    state.successMsg = action.payload;
  }
});

// THUNKS
export const fetchReleases = queryParameters => async dispatch => {
  var query = "";
  if (queryParameters) {
    const id = queryParameters.product;
    const sortKey = queryParameters.sort;
    query = (id ? "?product=" + id : "") + (sortKey ? "&sort=" + sortKey : "");
  }

  dispatch(getPending());
  Axios.get("/releases" + query)
    .then(res => {
      dispatch(getSuccess(res.data));
    })
    .catch(err => dispatch(getError(err)));
};

// Thunk for fetching
export const fetchReleaseById = id => async dispatch => {
  if (!id) {
    dispatch(
      getByIdError({ id, error: "Attempted to fetch item with undefined Id" })
    );
    return;
  }
  dispatch(getByIdPending({ id }));
  Axios.get("/releases/" + id)
    .then(res => {
      dispatch(getByIdSuccess({ id, data: res.data }));
    })
    .catch(error => {
      dispatch(getByIdError({ id, error }));
    });
};

export const putReleaseById = (id, data) => async dispatch => {
  dispatch(putByIdPending({ id }));
  Axios.put("/releases/" + id, data)
    .then(res => {
      dispatch(
        putByIdSuccess({ id: id, data: res.data, response: res.statusText })
      );
    })
    .catch(error => {
      dispatch(putByIdError({ id, error }));
    });
};

export function postRelease(releaseToCreate) {
  return dispatch => {
    dispatch(postPending());
    return Axios.post("releases", releaseToCreate)
      .then(response => {
        dispatch(postSuccess(response.statusText));
      })
      .catch(error => {
        dispatch(postError(error));
      });
  };
}

// UTIL
const updateInArray = (state, action) => {
  let index = state.items.findIndex(obj => obj.id == action.payload.id);
  if (index === -1) {
    state.items.push(action.payload.data);
  } else {
    state.items[index] = action.payload.data;
  }
};
// https://github.com/reduxjs/redux-toolkit/blob/master/docs/usage/usage-guide.md

// SELECTORS
export const getSuccesMessage = state => {
  return state.releases.successMsg;
};
