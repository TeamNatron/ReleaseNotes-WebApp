import configureMockStore from "redux-mock-store";
import expect from "expect"; // You can use any testing library
import thunk from "redux-thunk";
import Axios from "axios";
import { fetchProducts, actions } from "./productActions";

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);
jest.mock("axios");

describe("async actions", () => {
  it("creates FETCH_PRODUCTS_PENDING and FETCH_PRODUCTS_SUCCESS after fetching products", async () => {
    const data = {name: 'Cordel Inne'}
    Axios.get.mockImplementationOnce(() => Promise.resolve(data));

    const expectedActions = [
        actions.fetchProductsPending(),
        actions.fetchProductsSuccess()
    ]
    const store = mockStore({ products: [] })
    return store.dispatch(fetchProducts()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});