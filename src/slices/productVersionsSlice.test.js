import {
  fetchProductVersionsSuccess,
  productVersionsReducer,
} from "./productVersionsSlice";

describe("products reducer", () => {
  it("should handle fetching products", () => {
    expect(
      productVersionsReducer(
        {
          items: [],
        },
        fetchProductVersionsSuccess([{ name: "test-Version" }])
      )
    ).toEqual({
      items: [{ name: "test-Version" }],
    });
  });
});
