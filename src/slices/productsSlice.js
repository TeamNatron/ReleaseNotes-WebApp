import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import Axios from "axios";

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
      const product = state.items.find((p) => p.id === action.payload.id);
      product.versions.push(action.payload.data);
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

export function fetchProducts() {
  return (dispatch) => {
    dispatch(fetchProductsPending());
    return Axios.get("products/")
      .then((res) => {
        dispatch(fetchProductsSuccess({ data: res.data }));
      })
      .catch((error) => {
        dispatch(fetchProductsError(error));
      });
  };
}

export function registerNewProduct(name, isPublic) {
  return Axios.post("products", {
    name: name,
    isPublic: isPublic,
  });
}

export const getAllProductVersionsSelector = createSelector(
  (state) => state.products.items,
  (products) => {
    var productVersions = getProductVersions(products);
    return productVersions;
  }
);

export const getProductVersions = (items) => {
  var newArray = [];
  items.forEach((p) => {
    p.versions.forEach((element) => {
      /* Cloning field 'fullname' since Selector Components needs a fields named 'value'
      
         Ran into issues where mutating element directly threw 'TypeError: can't define property "x": "obj" is not extensible'
         https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cant_define_property_object_not_extensible

         So I had to create new objects
      */
      var newElement = {
        id: element.id,
        version: element.version,
        fullName: element.fullName,
        value: element.fullName,
      };
      newArray.push(newElement);
    });
  });
  return newArray;
};
