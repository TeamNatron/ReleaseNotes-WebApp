import {
  productsReducer,
  fetchProductsSuccess,
  fetchProducts,
  getProductVersions
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

describe("products selectors", () => {
  it("should return all productVersions", async () => {
    var productVersions = getProductVersions(dummyProducts);
    expect(productVersions).toEqual(dummyProductVersions);
  });
});

// DUMMYDATA
const dummyProductVersions = [
  {
    id: 100,
    version: "1.0",
    fullName: "Cordel Inne 1.0",
    value: "Cordel Inne 1.0"
  },
  {
    id: 101,
    version: "2.0",
    fullName: "Cordel Inne 2.0",
    value: "Cordel Inne 2.0"
  },
  {
    id: 105,
    version: "2.1-Beta",
    fullName: "Cordel Inne 2.1-Beta",
    value: "Cordel Inne 2.1-Beta"
  },
  {
    id: 102,
    version: "3.0",
    fullName: "Cordel Ute 3.0",
    value: "Cordel Ute 3.0"
  }
];

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
