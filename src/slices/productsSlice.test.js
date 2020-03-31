import {
  productsReducer,
  fetchProductsSuccess,
  fetchProducts,
  postProductVersionSuccess
} from "./productsSlice";
import { testThunkConformance } from "../utils/test/testThunkConformance";

describe("products reducer", () => {
  describe("fetchProductsSuccess", () => {
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
  describe("postProductVersionSuccess", () => {
    it("adds new version to productVersions array in the correct product", () => {
      const dummyItem = dummyProducts[1];
      const initalLength = dummyItem.versions.length;
      const updatedState = productsReducer(
        { items: dummyProducts },
        postProductVersionSuccess({
          data: { productId: dummyItem.id, id: 999 }
        })
      );
      expect(updatedState.items[1].versions).toHaveLength(initalLength + 1);
    });
  });
});

describe("products thunks", () => {
  testThunkConformance(fetchProducts);
});

const dummyProducts = [
  {
    id: 100,
    name: "Cordel Inne",
    versions: [
      {
        id: 100,
        version: "1.0",
        fullName: "Cordel Inne 1.0"
      },
      {
        id: 101,
        version: "2.0",
        fullName: "Cordel Inne 2.0"
      },
      {
        id: 105,
        version: "2.1-Beta",
        fullName: "Cordel Inne 2.1-Beta"
      }
    ]
  },
  {
    id: 101,
    name: "Cordel Ute",
    versions: [
      {
        id: 102,
        version: "3.0",
        fullName: "Cordel Ute 3.0"
      }
    ]
  }
];
