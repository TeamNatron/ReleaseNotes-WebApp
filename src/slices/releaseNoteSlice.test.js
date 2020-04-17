import {
  releaseNoteReducer,
  fetchReleaseNotes,
  fetchReleaseNoteById,
  putReleaseNote,
  postReleaseNote,
  deleteReleaseNote,
  getSuccess,
  saveSuccess,
} from "./releaseNoteSlice";
import { testThunkConformance } from "../utils/test/testThunkConformance";
import { deleteSuccess } from "./releaseNoteSlice";
import { getByIdSuccess } from "./releaseNoteSlice";

describe("releaseNotes reducer", () => {
  it("should return the initial state", () => {
    expect(releaseNoteReducer(undefined, {})).toEqual({ items: [] });
  });
  describe("getSuccess", () => {
    it("should add all items to the state", () => {
      const updatedState = releaseNoteReducer(
        undefined,
        getSuccess({ data: dummyItems })
      );
      expect(updatedState.items).toEqual(dummyItems);
    });
  });
  describe("saveSuccess", () => {
    it("should add one item to the state", () => {
      const updatedState = releaseNoteReducer(
        undefined,
        saveSuccess({ data: dummyItems[0], id: dummyItems[0].id })
      );
      expect(updatedState.items[0]).toEqual(dummyItems[0]);
    });
    it("should replace one item in the state", () => {
      const updatedState = releaseNoteReducer(
        undefined,
        saveSuccess({ data: dummyItems[1], id: dummyItems[0].id })
      );
      expect(updatedState.items[0]).toEqual(dummyItems[1]);
    });
  });
  describe("getByIdSuccess", () => {
    it("should add one item to the state", () => {
      const updatedState = releaseNoteReducer(
        undefined,
        getByIdSuccess({ data: dummyItems[0], id: dummyItems[0].id })
      );
      expect(updatedState.items[0]).toEqual(dummyItems[0]);
    });
    it("should replace one item in the state", () => {
      const updatedState = releaseNoteReducer(
        undefined,
        getByIdSuccess({ data: dummyItems[1], id: dummyItems[0].id })
      );
      expect(updatedState.items[0]).toEqual(dummyItems[1]);
    });
  });
  describe("deleteSuccess", () => {
    it("should delete one item", () => {
      const initialLength = dummyItems.length;
      const itemToDelete = dummyItems[3];
      const updatedState = releaseNoteReducer(
        { items: dummyItems },
        deleteSuccess({ id: itemToDelete.id })
      );
      expect(updatedState.items.length).toEqual(initialLength - 1);
      expect(updatedState.items).not.toContain(itemToDelete);
    });
  });
});

describe("releaseNotes Thunks", () => {
  testThunkConformance(fetchReleaseNotes);
  testThunkConformance(fetchReleaseNoteById);
  testThunkConformance(putReleaseNote);
  testThunkConformance(postReleaseNote);
  testThunkConformance(deleteReleaseNote);
});

const dummyItems = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
