import Axios from "axios";
import { getAuthToken } from "../handlers/cookieHandler";

export const FETCH_PRODUCTS_PENDING = "fetchProductsPending";
export const FETCH_PRODUCTS_SUCCESS = "fetchProductsSuccess";
export const FETCH_PRODUCTS_ERROR = "fetchProductsError";

export function fetchProducts() {
  return dispatch => {
    dispatch(actions.fetchProductsPending());
    return Axios.get("products/")
      .then(res => {
        dispatch(actions.fetchProductsSuccess(res.data));
      })
      .catch(error => {
        dispatch(actions.fetchProductsError(error));
      });
  };
}

export function registerNewProduct(name, isPublic) {
  return Axios.post(
    "products",
    {
      name: name,
      isPublic: isPublic
    },
    {
      withCredentials: false,
      headers: {
        ["Access-Control-Request-Headers"]: "Content-Type",
        ["Authorization"]: "Bearer " + getAuthToken()
      }
    }
  );
}

export const actions = {
  fetchProductsPending() {
    return {
      type: FETCH_PRODUCTS_PENDING
    };
  },

  fetchProductsSuccess(products) {
    return {
      type: FETCH_PRODUCTS_SUCCESS,
      payload: products
    };
  },

  fetchProductsError(error) {
    return {
      type: FETCH_PRODUCTS_ERROR,
      payload: error
    };
  }
};
