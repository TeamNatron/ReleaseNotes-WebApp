import {
  productsReducer,
  fetchProductsSuccess,
  fetchProducts
} from "./productsSlice";
import { testThunkConformance } from "../utils/test/testThunkConformance";

describe("products reducer", () => {
  it("should handle fetching products", () => {
    expect(
      productsReducer(
        undefined,
        fetchProductsSuccess({ data: [{ name: "test-product" }] })
      )
    ).toEqual({
      items: [{ name: "test-product" }]
    });
  });
});

describe("products thunks", () => {
  testThunkConformance(fetchProducts);
});
