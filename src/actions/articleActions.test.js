import configureMockStore from "redux-mock-store";
import expect from "expect"; // You can use any testing library
import thunk from "redux-thunk";
import Axios from "axios";
import { fetchArticlesByProductId, actions } from "./articleActions";

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
jest.mock("axios");

describe("async actions", () => {
  it("creates FETCH_ARTICLES_PENDING and FETCH_ARTICLES_SUCCESS after fetching articles", async () => {
    const data = {title: 'Cordel Some-Title 11.23'}
    Axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const expectedActions = [
        actions.fetchArticlesPending(),
        actions.fetchArticlesSuccess()
    ]
    const store = mockStore({ articles: [] })
    return store.dispatch(fetchArticlesByProductId()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});