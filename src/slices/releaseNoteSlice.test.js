import { releaseNoteReducer, getByIdSuccess } from "./releaseNoteSlice";
import { getSuccess } from "./releaseSlice";

describe("releaseNotes reducer", () => {
  it("should return the initial state", () => {
    expect(releaseNoteReducer(undefined, {})).toEqual({ items: [] });
  });
  it("should ", () => {
    expect(
      releaseNoteReducer(undefined, {})
    ).toHaveProperty("items");
  });
});
