import { authReducer } from "./authSlice";
import { testThunkConformance } from "../utils/test/testThunkConformance";
import { putSuccess, checkLoggedIn, updateAzureInfo, login } from "./authSlice";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { setAuthToken } from "../handlers/cookieHandler";

describe("Auth reducer", () => {
  it("should return the inital state", () => {
    expect(authReducer(undefined, {})).toEqual({
      isLogged: false,
      sucessMsg: "",
      currentUser: {
        id: -1,
        email: "",
        roles: [],
        azureInformation: {
          id: -1,
          userid: "",
          pat: "",
          organization: ""
        }
      }
    });
  });
});

describe("putSuccess", () => {
  it("should fill all currentUsers fields", () => {
    const updatedState = authReducer(
      undefined,
      putSuccess({ data: dummyUser })
    );
    expect(updatedState.currentUser).toEqual(dummyUser);
  });
});

const mockResolve = () => {
  jest.mock("js-cookie");
  setAuthToken("eylmaooooa12312312bbb");
};

const testCheckLoggedinConformancer = () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  var store;

  beforeEach(() => {
    store = mockStore({ items: [] });
    store.clearActions();
  });

  it("checkLoggedIn dispatches PENDING and ERROR actions", async () => {
    const store = mockStore({ items: [] });

    return store.dispatch(checkLoggedIn()).catch(error => {
      const actions = store.getActions();
      expect(actions[0].type.toLowerCase()).toMatch("pending");
      expect(actions[1].type.toLowerCase()).toMatch("error");
    });
  });

  it("checkLoggedIn dispatches PENDING and SUCCESS actions", async () => {
    mockResolve();
    return store.dispatch(checkLoggedIn()).then(() => {
      // return of async actions
      const actions = store.getActions();
      expect(actions[0].type.toLowerCase()).toMatch("pending");
      expect(actions[1].type.toLowerCase()).toMatch("success");
    });
  });
};

describe("Auth Thunks", () => {
  testThunkConformance(login);
  testThunkConformance(updateAzureInfo);
  testCheckLoggedinConformancer();
});

const dummyUser = {
  id: 1,
  email: "admin@ungspiller.no",
  roles: ["Administrator"],
  azureInformation: {
    id: -1,
    userid: "admin@azure.no",
    pat: "AASDA12312EWWERWER",
    organization: "ReleaseNotesSystem"
  }
};
