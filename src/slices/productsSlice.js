import { createAction, createReducer } from "@reduxjs/toolkit";
import Axios from "axios";

const name = "products/";
export const fetchProductsPending = createAction(name + "getPending");
export const fetchProductsError = createAction(name + "getError");
export const fetchProductsSuccess = createAction(name + "getSuccess");

export const productsReducer = createReducer(
  { items: [] },
  {
    [fetchProductsSuccess]: (state, action) => {
      state.items = action.payload.data;
    }
  }
);

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
