import { productsReducer, fetchProductsSuccess } from "./productsSlice";

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
