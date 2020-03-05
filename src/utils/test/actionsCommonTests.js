import Axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect"; // You can use any testing library
jest.mock("axios");

/**
 * Test an async function doing a network call, and using the
 * pending - success - error pattern
 */
export function testNetworkRoundtrip(functionToTest) {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  it("dispatches PENDING and SUCCESS actions", async () => {
    const response = { data: "Succesful request" };
    Axios.get.mockImplementationOnce(() => Promise.resolve(response));
    const store = mockStore({ items: [] });

    return store.dispatch(functionToTest()).then(() => {
      // return of async actions
      const actions = store.getActions();
      expect(actions[0].type.toLowerCase()).toMatch("pending");
      expect(actions[1].type.toLowerCase()).toMatch("success");
    });
  });

  it("dispatches PENDING and ERROR actions", async () => {
    const response = { data: "UnSuccesful request" };
    Axios.get.mockImplementationOnce(() => Promise.reject(response));
    const store = mockStore({ items: [] });

    return store.dispatch(functionToTest()).catch(error => {
      const actions = store.getActions();
      expect(actions[0].type.toLowerCase()).toMatch("pending");
      expect(actions[1].type.toLowerCase()).toMatch("error");
    });
  });
}
