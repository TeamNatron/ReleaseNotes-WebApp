import releases, {
  getPending,
  getSuccess,
  getError,
  putIsPublicPending,
  putIsPublicSuccess,
  putIsPublicError
} from "./releaseSlice";

console.log(releases);

const initialState = {
  pending: false,
  error: "",
  items: [
    {
      "0": {
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
    }
  ]
};

const initialStateWithoutItems = {
  pending: false,
  error: "",
  items: []
};

describe("releases reducer", () => {
  it("should handle initial state", () => {
    expect(releases(undefined, {})).toEqual(initialStateWithoutItems);
  });

  it("should handle putIsPublicSuccess", () => {
    expect(
      releases(initialState, {
        type: getSuccess.type,
        payload: {
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
        }
      })
    ).toEqual({
      pending: false,
      error: "",
      items: {
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
      }
    });
  });
  it("should handle getSuccess", () => {
    expect(
      releases(initialStateWithoutItems, {
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
      })
    ).toEqual({
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
      ]
    });
  });
});
