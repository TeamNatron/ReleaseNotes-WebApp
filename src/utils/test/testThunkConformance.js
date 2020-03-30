import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect"; // You can use any testing library
import Axios from "axios";

var axios = Axios;

/**
 * Test an async function doing a network call, and using the
 * pending - success - error pattern
 *
 * @example
 *        // use global axios instance
 *        testThunkConformance(fetchDingos)
 *
 * @example
 *        // use custom axios instance
 *        testThunkConformance(fetchDingos, someAxiosInstance)
 *
 * @example
 *        // use with custom parameters
 *        testThunkConformance(() => fetchDingos("africa"))
 */
export function testThunkConformance(functionToTest, axiosInstance) {
  if (axiosInstance) {
    axios = axiosInstance;
  }
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  var store;
  beforeEach(() => {
    store = mockStore({ items: [] });
    store.clearActions();
  });
  it(
    functionToTest.name + " dispatches PENDING and SUCCESS actions",
    async () => {
      mockResolve();
      return store.dispatch(functionToTest()).then(() => {
        // return of async actions
        const actions = store.getActions();
        expect(actions[0].type.toLowerCase()).toMatch("pending");
        expect(actions[1].type.toLowerCase()).toMatch("success");
      });
    }
  );

  it(
    functionToTest.name + " dispatches PENDING and ERROR actions",
    async () => {
      mockReject();
      const store = mockStore({ items: [] });

      return store.dispatch(functionToTest()).catch(error => {
        const actions = store.getActions();
        expect(actions[0].type.toLowerCase()).toMatch("pending");
        expect(actions[1].type.toLowerCase()).toMatch("error");
      });
    }
  );
}

function mockReject() {
  const response = { data: "UnSuccesful request" };
  doMockAxiosRequests(() => Promise.reject(response));
}

function mockResolve() {
  const response = {
    status: 200,
    data: { text: "Succesful request", id: 1 }
  };
  doMockAxiosRequests(() => Promise.resolve(response));
}
function doMockAxiosRequests(promiseFn) {
  const mockFn = jest.fn(url => promiseFn());
  axios.get = mockFn;
  axios.put = mockFn;
  axios.post = mockFn;
  axios.delete = mockFn;
}
