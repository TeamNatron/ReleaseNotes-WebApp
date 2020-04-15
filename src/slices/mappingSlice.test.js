import { mappingReducer, initialState } from "./mappingSlice";

describe("mappings reducer", () => {
  it("should return the initial state", () => {
    expect(mappingReducer(undefined, {})).toEqual(initialState);
  });
});
