import {
  releaseReducer,
  getPending,
  getSuccess,
  getError,
  putByIdSuccess,
  fetchReleaseById,
  fetchReleases,
  putReleaseById,
  postRelease,
  deleteRelease
} from "./releaseSlice";
import { testThunkConformance } from "../utils/test/testThunkConformance";
describe("releaseNotes Thunks", () => {
  testThunkConformance(fetchReleaseById);
  testThunkConformance(fetchReleases);
  testThunkConformance(putReleaseById);
  testThunkConformance(postRelease);
  testThunkConformance(deleteRelease);
});
describe("releases reducer", () => {
  it("should handle initial state", () => {
    expect(releaseReducer(undefined, {})).toEqual(initialStateWithoutItems);
  });

  it("should handle add item to the list when it doesnt already exist", () => {
    const initialLength = initialState.items.length;
    const updatedState = releaseReducer(initialState, {
      type: putByIdSuccess.type,
      payload: {
        id: 666,
        data: { release: "Some object.." }
      }
    });
    expect(updatedState.items).toContainEqual({ release: "Some object.." });
    expect(updatedState.items.length).toEqual(initialLength + 1);
  });
  it("should replace existing item with the same id", () => {
    const updatedState = releaseReducer(initialState, {
      type: putByIdSuccess.type,
      payload: {
        id: 100,
        data: { release: "Some object.." }
      }
    });
    expect(updatedState).toEqual({
      pending: false,
      error: "",
      items: [{ release: "Some object.." }]
    });
  });
  it("should handle getSuccess", () => {
    expect(
      releaseReducer(initialStateWithoutItems, successActionWithPayload)
    ).toEqual(updatedState);
  });
});

const initialStateWithoutItems = {
  pending: false,
  error: "",
  items: [],
  successMsg: ""
};

const initialState = {
  pending: false,
  error: "",
  items: [
    {
      id: 100,
      productVersion: {
        id: 100,
        productId: 100,
        product: null,
        version: "2.5.4",
        isPublic: false
      },
      title: "Finally Rich",
      isPublic: false,
      releaseNotes: []
    }
  ]
};
const successActionWithPayload = {
  type: getSuccess.type,
  payload: [
    {
      id: 100,
      productVersion: {
        id: 100,
        productId: 100,
        product: null,
        version: "2.5.4",
        isPublic: false
      },
      title: "Finally Rich",
      isPublic: true,
      releaseNotes: []
    },
    {
      id: 101,
      productVersion: {
        id: 101,
        productId: 100,
        product: null,
        version: "3.1.1",
        isPublic: false
      },
      title: "Love Sosa",
      isPublic: true,
      releaseNotes: []
    },
    {
      id: 102,
      productVersion: {
        id: 102,
        productId: 101,
        product: null,
        version: "5.3",
        isPublic: false
      },
      title: "Chief Keef",
      isPublic: true,
      releaseNotes: []
    },
    {
      id: 103,
      productVersion: {
        id: 103,
        productId: 102,
        product: null,
        version: "4.2",
        isPublic: false
      },
      title: "2012",
      isPublic: false,
      releaseNotes: []
    }
  ]
};
const updatedState = {
  pending: false,
  error: "",
  items: [
    {
      id: 100,
      productVersion: {
        id: 100,
        productId: 100,
        product: null,
        version: "2.5.4",
        isPublic: false
      },
      title: "Finally Rich",
      isPublic: true,
      releaseNotes: []
    },

    {
      id: 101,
      productVersion: {
        id: 101,
        productId: 100,
        product: null,
        version: "3.1.1",
        isPublic: false
      },
      title: "Love Sosa",
      isPublic: true,
      releaseNotes: []
    },

    {
      id: 102,
      productVersion: {
        id: 102,
        productId: 101,
        product: null,
        version: "5.3",
        isPublic: false
      },
      title: "Chief Keef",
      isPublic: true,
      releaseNotes: []
    },

    {
      id: 103,
      productVersion: {
        id: 103,
        productId: 102,
        product: null,
        version: "4.2",
        isPublic: false
      },
      title: "2012",
      isPublic: false,
      releaseNotes: []
    }
  ],
  successMsg: ""
};
