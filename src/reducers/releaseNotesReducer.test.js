import { releaseNotes, releaseNote } from "./initialStates";
import { releaseNotesReducer } from "./releaseNotesReducer";
import {
  actions,
  FETCH_RELEASENOTE_SUCCESS
} from "../actions/releaseNoteActions";

describe("releaseNotes reducer", () => {
  it("should return the initial state", () => {
    expect(releaseNotesReducer(undefined, {})).toEqual(releaseNotes);
  });
  it("should ", () => {
    expect(
      releaseNotesReducer(undefined, actions.fetchReleaseNotePending())
    ).toHaveProperty("items");
  });
});
