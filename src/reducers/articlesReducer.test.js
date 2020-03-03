import { articles } from "./initialStates";
import { actions, FETCH_ARTICLES_SUCCESS } from "../actions/articleActions";
import { articlesReducer } from "./articlesReducer";

describe("fetch releases", () => {
  it("should return the initial state", () => {
    expect(articlesReducer(undefined, {})).toEqual(articles);
  });
  it("should handle fetching-state and persisting articles to store", () => {
    expect(
      articlesReducer(undefined, actions.fetchArticlesPending())
    ).toHaveProperty("pending", true);
    expect(
      articlesReducer(undefined, {
        type: FETCH_ARTICLES_SUCCESS,
        payload: [{ name: "test-article" }]
      })
    ).toEqual({
      pending: false,
      items: [{ name: "test-article" }],
      error: null
    });
  });
});

describe("save release", () => {
  const objectToSave = { id: 1, name: "edited release" };
  const initialState = {
    items: [
      { id: 1, name: "undedited release" },
      { id: 2, name: "some other release" }
    ]
  };
  const updateItem = articlesReducer(
    initialState,
    actions.saveReleaseSuccess(objectToSave)
  ).items;
  it("should update correct item in the state", () => {
    expect(updateItem.length).toEqual(2);
    expect(updateItem[0]).toEqual(objectToSave);
    expect(updateItem[1]).toEqual(initialState.items[1]);
  });
  it("should not mess up state when id doesnt exist in state", () => {
    const updateWithNoPayload = articlesReducer(
      initialState,
      actions.saveReleaseSuccess({ id: 153, name: "some other release" })
    ).items;
    expect(updateWithNoPayload).toEqual(initialState.items)
  })
});
