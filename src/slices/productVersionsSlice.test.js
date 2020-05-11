import { productVersions } from "./initialStates";
import {
  FETCH_VERSIONS_SUCCESS,
  actions,
} from "../actions/productVersionsActions";
import { productVersionsReducer } from "./productVersionsReducer";
import { fetchProductVersionsSuccess } from "./productVersionsSlice";

describe("products reducer", () => {
  it("should return the initial state", () => {
    expect(productVersionsReducer(undefined, {})).toEqual(productVersions);
  });
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
