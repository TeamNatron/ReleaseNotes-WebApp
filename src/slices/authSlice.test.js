import { authReducer, azureApiSelector } from "./authSlice";
import { testThunkConformance } from "../utils/test/testThunkConformance";
import { putSuccess, checkLoggedIn, fetchAzureInfo, updateAzureInfo, login } from "./authSlice";
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

describe("Selectors", () => {
  describe("azureApiSelector()", () => {
    it("creates an auth token", () => {
      const expectedOrg =
        dummyState.auth.currentUser.azureInformation.organization;
      const result = azureApiSelector(dummyState);
      expect(result.organization).toEqual(expectedOrg);
      expect(isBase64(result.authToken)).toEqual(true);
    });
  });
});

describe("Auth Thunks", () => {
  testThunkConformance(login);
  testThunkConformance(fetchAzureInfo);
  testThunkConformance(updateAzureInfo);
  testCheckLoggedinConformancer();
});

// https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
const notBase64 = /[^A-Z0-9+\/=]/i;
export default function isBase64(str) {
  const len = str.length;
  if (!len || len % 4 !== 0 || notBase64.test(str)) {
    return false;
  }
  const firstPaddingChar = str.indexOf("=");
  return (
    firstPaddingChar === -1 ||
    firstPaddingChar === len - 1 ||
    (firstPaddingChar === len - 2 && str[len - 1] === "=")
  );
}

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

const dummyState = {
  auth: {
    currentUser: dummyUser
  }
};
