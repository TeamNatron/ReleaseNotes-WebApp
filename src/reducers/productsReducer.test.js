import { productsReducer } from "./productsReducer";
import { products } from "./initialStates";
import { actions, FETCH_PRODUCTS_SUCCESS } from "../actions/productActions";

describe("products reducer", () => {
  it("should return the initial state", () => {
    expect(productsReducer(undefined, {})).toEqual(products);
  });
  it("should handle fetching products", () => {
    expect(
      productsReducer(undefined, actions.fetchProductsPending())
    ).toHaveProperty("pending", true);
    expect(
      productsReducer(
        {
          pending: false,
          items: [],
          error: null
        },
        {
          type: FETCH_PRODUCTS_SUCCESS,
          payload: [{ name: "test-product" }]
        }
      )
    ).toEqual({
      pending: false,
      items: [{ name: "test-product" }],
      error: null
    });
  });
});
