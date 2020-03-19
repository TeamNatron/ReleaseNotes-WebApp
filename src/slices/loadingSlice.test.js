import { loadingReducer, loadingSelector } from "./loadingSlice";

describe("loadingSlice", () => {
  it("Adds correctly handles loading states when receiving actions", () => {
    const updatedState = loadingReducer(undefined, actionPending);
    expect(updatedState).toEqual({ someAction: true });

    const updatedState2 = loadingReducer(updatedState, action2Pending);
    expect(updatedState2).toEqual({ someAction: true, someOtherAction: true });

    const updatedState3 = loadingReducer(updatedState2, actionError);
    expect(updatedState3).toEqual({ someAction: false, someOtherAction: true });
  });
});

describe("loadingSlice selectors", () => {
  it("returns true if anything is loading", () => {
    const loading = loadingSelector(mockState);
    expect(loading).toEqual(true);
  });
  it("returns false if nothing is loading", () => {
    const loading = loadingSelector(mockStateAllFalse);
    expect(loading).toEqual(false);
  });
  it("returns false state us undefined", () => {
    const loading = loadingSelector(null);
    expect(loading).toEqual(false);
  });
});

const actionPending = { type: "someActionPending" };
const action2Pending = { type: "someOtherActionPending" };
const actionError = { type: "someActionError" };

const mockState = {
  loading: { 1: false, 2: true, 3: true, 4: true, 5: false }
};
const mockStateAllFalse = {
  loading: { 1: false, 2: false, 3: false, 4: false, 5: false }
};
