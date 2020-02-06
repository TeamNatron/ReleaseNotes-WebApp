import Axios from "axios";
export const FETCH_PRODUCTS_PENDING = "fetchProductsPending";
export const FETCH_PRODUCTS_SUCCESS = "fetchProductsSuccess";
export const FETCH_PRODUCTS_ERROR = "fetchProductsError";

export function fetchProducts() {
  console.log("1")
  return dispatch => {
    console.log("2")

    dispatch(actions.fetchProductsPending());
    return Axios.get("/products")
      .then(res => dispatch(actions.fetchProductsSuccess(res.products)))
      .catch(error => dispatch(actions.fetchProductsError(error)));
  };
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
