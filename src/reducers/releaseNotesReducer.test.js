import { releaseNotes, releaseNote } from "./initialStates";
import { releaseNotesReducer } from "./releaseNotesReducer";
import {
  actions,
  FETCH_ALL_RELEASENOTES_SUCCESS
} from "../actions/releaseNoteActions";

describe("releaseNotes reducer", () => {
  it("should return the initial state", () => {
    expect(releaseNotesReducer(undefined, {})).toEqual(releaseNotes);
  });
  it("should handle fetching all release notes", () => {
    expect(
      releaseNotesReducer(undefined, actions.fetchAllReleaseNotesPending())
    ).toHaveProperty("pending", true);

    expect(
      releaseNotesReducer(
        undefined,
        actions.fetchAllReleaseNotesError("some error")
      ).console.error
    ).toEqual("some error");

    expect(
      releaseNotesReducer(
        {
          pending: false,
          items: [],
          error: null
        },
        {
          type: FETCH_ALL_RELEASENOTES_SUCCESS,
          payload: [{ name: "test-Version" }]
        }
      )
    ).toEqual({
      pending: false,
      items: [{ name: "test-Version" }],
      error: null
    });
  });
  /*
  it("should ", () => {
    expect(
      releaseNotesReducer(undefined, actions.fetchReleaseNotePending())
    ).toHaveProperty("items");
  });
  */
});
