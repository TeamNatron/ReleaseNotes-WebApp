import { mappingReducer, initialState, fetchRNSMappable } from "./mappingSlice";
import { testThunkConformance } from "../utils/test/testThunkConformance";

describe("mappings reducer", () => {
  it("should return the initial state", () => {
    expect(mappingReducer(undefined, {})).toEqual(initialState);
  });
});

describe("releaseNotes Thunks", () => {
  testThunkConformance(fetchRNSMappable);
});
