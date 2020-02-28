import { productVersions } from "./initialStates";
import {
  FETCH_VERSIONS_SUCCESS,
  actions
} from "../actions/productVersionsActions";
import { productVersionsReducer } from "./productVersionsReducer";

describe("products reducer", () => {
  it("should return the initial state", () => {
    expect(productVersionsReducer(undefined, {})).toEqual(productVersions);
  });
  it("should handle fetching products", () => {
    expect(
      productVersionsReducer(undefined, actions.fetchProductVersionsPending())
    ).toHaveProperty("pending", true);

    expect(
      productVersionsReducer(
        undefined,
        actions.fetchProductVersionsError("some error")
      ).error
    ).toEqual("some error");

    expect(
      productVersionsReducer(
        {
          pending: false,
          items: [],
          error: null
        },
        {
          type: FETCH_VERSIONS_SUCCESS,
          payload: [{ name: "test-Version" }]
        }
      )
    ).toEqual({
      pending: false,
      items: [{ name: "test-Version" }],
      error: null
    });
  });
});
