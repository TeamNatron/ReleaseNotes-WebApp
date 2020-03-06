import React from "react";
import ReleaseEditorScreen from "./ReleaseEditorScreen";
import { mount, shallow } from "enzyme";
import combinedReducers from "../../reducers/combinedReducers";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { productVersions } from "../../reducers/initialStates";
import { Provider } from "react-redux";
import { Button, Switch } from "@material-ui/core";
import { useHistory } from "react-router";
import TitleTextField from "../releaseEditor/TitleTextField";
import ReleaseEditor from "../releaseEditor/ReleaseEditor";
import Column from "../releaseEditor/Column";

/*jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
  connect: jest.fn()
}));*/

jest.mock("react-router");

describe("<ReleaseEditorScreen /> ", () => {
  const rootReducer = combinedReducers;
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  var store = undefined;

  // redux state
  const state = {
    releaseNotes: { items: [{ id: 0 }, { id: 1 }] },
    productVersions,
    releases: {
      items: [{ id: 0, title: "abc", isPublic: true, successMsg: "" }]
    },
    error: ""
  };
  beforeEach(() => {
    store = mockStore(state);
  });

  const props = {
    match: { params: { id: 0 } } // Router props
  };

  it("Renders with props", () => {
    useHistory.mockImplementation(() => jest.fn());
    const attachTo = document.createElement("div");
    const wrapper = mount(
      <Provider store={store}>
        <ReleaseEditorScreen {...props} />
      </Provider>,
      attachTo
    );
    const editor = wrapper.find(ReleaseEditor);

    expect(wrapper.exists()).toBe(true);
    expect(editor.exists()).toBe(true);

    const titleInput = editor.find(TitleTextField);
    const buttons = editor.find(Button);
    const isPublic = editor.find(Switch).at(0);
    const Columns = editor.find(Column);

    // title input
    expect(titleInput.prop("value")).toEqual("abc");

    // isPublic 1
    expect(isPublic.prop("value")).toBe(true);

    // releaseNotes columns
  });
});
