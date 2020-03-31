import { createAction, createReducer } from "@reduxjs/toolkit";
import Axios from "axios";
import { updateInArray } from "../utils/stateUtil";

const name = "products/";
export const fetchProductsPending = createAction(name + "getPending");
export const fetchProductsError = createAction(name + "getError");
export const fetchProductsSuccess = createAction(name + "getSuccess");

export const postProductVersionPending = createAction(
  name + "postProductVersionPending"
);
export const postProductVersionError = createAction(
  name + "postProductVersionError"
);
export const postProductVersionSuccess = createAction(
  name + "postProductVersionSuccess"
);

export const productsReducer = createReducer(
  { items: [] },
  {
    [fetchProductsSuccess]: (state, action) => {
      state.items = action.payload.data;
    },
    [postProductVersionSuccess]: (state, action) => {
      const product = state.items.find(
        p => p.id == action.payload.data.productId
      );
      updateInArray(
        product.productVersions,
        action.payload.data.id,
        action.payload.data
      );
    }
  }
);

export const postProductVersion = (id, productVersion) => async dispatch => {
  dispatch(postProductVersionPending());
  Axios.post("products/" + id + "/version", productVersion)
    .then(res => {
      dispatch(postProductVersionSuccess({ data: res.data, id: res.data.id }));
    })
    .then(error => {
      dispatch(postProductVersionError(error));
    });
};

export function fetchProducts() {
  return dispatch => {
    dispatch(fetchProductsPending());
    return Axios.get("products/")
      .then(res => {
        dispatch(fetchProductsSuccess({ data: res.data }));
      })
      .catch(error => {
        dispatch(fetchProductsError(error));
      });
  };
}

export function registerNewProduct(name, isPublic) {
  return Axios.post("products", {
    name: name,
    isPublic: isPublic
  });
}
