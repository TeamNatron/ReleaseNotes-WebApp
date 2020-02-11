import { articles } from "./initialStates";
import { actions, FETCH_ARTICLES_SUCCESS } from "../actions/articleActions";
import { articlesReducer } from "./articlesReducer";

describe("articles reducer", () => {
  it("should return the initial state", () => {
    expect(articlesReducer(undefined, {})).toEqual(articles);
  });
  it("should handle fetching-state and persisting articles to store", () => {
    expect(
      articlesReducer(undefined, actions.fetchArticlesPending())
    ).toHaveProperty("pending", true);
    expect(
      articlesReducer(
        undefined,
        {
          type: FETCH_ARTICLES_SUCCESS,
          payload: [{ name: "test-article" }]
        }
      )
    ).toEqual({
      pending: false,
      items: [{ name: "test-article" }],
      error: null
    });
  });
});
