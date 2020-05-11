import { createReducer, createAction } from "@reduxjs/toolkit";
import Axios from "axios";

// POST
const name = "productVersions/";
export const postProductVersionPending = createAction(name + "postPending");
export const postProductVersionError = createAction(name + "postError");
export const postProductVersionSuccess = createAction(name + "postSuccess");

// PUT
export const putProductVersionPending = createAction(name + "putPending");
export const putProductVersionError = createAction(name + "putError");
export const putProductVersionSuccess = createAction(name + "putSuccess");

// GET
export const fetchProductVersionsPending = createAction(name + "fetchPending");
export const fetchProductVersionsError = createAction(name + "fetchError");
export const fetchProductVersionsSuccess = createAction(name + "fetchSuccess");

export const productVersionsReducer = createReducer(
  { items: [] },
  {
    [fetchProductVersionsSuccess]: (state, action) => {
      state.items = action.payload;
    },
  }
);

export const postProductVersion = (id, productVersion) => async (dispatch) => {
  dispatch(postProductVersionPending());
  Axios.post("products/" + id + "/version", productVersion)
    .then((res) => {
      dispatch(postProductVersionSuccess({ data: res.data, id: id }));
    })
    .catch((error) => {
      dispatch(postProductVersionError(error));
    });
};

export const putProductVersion = (id, productVersion) => async (dispatch) => {
  dispatch(putProductVersionPending());
  Axios.put("products/" + id + "/version", productVersion)
    .then((res) => {
      dispatch(putProductVersionSuccess({ data: res.data, id: id }));
    })
    .catch((error) => {
      dispatch(putProductVersionError(error));
    });
};

export function fetchProductVersions() {
  return (dispatch) => {
    dispatch(fetchProductVersionsPending());
    return Axios.get("productversions")
      .then((response) => {
        dispatch(fetchProductVersionsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchProductVersionsError(error));
      });
  };
}
