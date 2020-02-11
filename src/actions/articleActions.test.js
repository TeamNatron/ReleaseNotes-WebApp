import configureMockStore from "redux-mock-store";
import expect from "expect"; // You can use any testing library
import thunk from "redux-thunk";
import Axios from "axios";
import { actions, fetchArticles } from "./articleActions";

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
jest.mock("axios");

describe("Dispatch async actions actions", () => {
  const expectedActions = [
    actions.fetchArticlesPending(),
    actions.fetchArticlesSuccess()
]
const data = {title: 'Cordel Some-Title 11.23'}
  it("dispatch PENDING and SUCCESS actions", async () => {
    Axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const store = mockStore({ articles: [] })
    return store.dispatch(fetchArticles()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("dispatch PENDING and SUCCESS actions with strange queryParams", async () => {
    Axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const store = mockStore({ articles: [] })
    return store.dispatch(fetchArticles({ooga: "booga", formel: "1"})).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("dispatch PENDING and SUCCESS actions with NULL queryParams", async () => {
    Axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const store = mockStore({ articles: [] })
    return store.dispatch(fetchArticles({product: null, sort: null})).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});