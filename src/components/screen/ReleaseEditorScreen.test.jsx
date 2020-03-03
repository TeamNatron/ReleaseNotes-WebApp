import React from "react";
import ReleaseEditorScreen from "./ReleaseEditorScreen";
import { mount, shallow } from "enzyme";
import combinedReducers from "../../reducers/combinedReducers";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { releaseNotes, productVersions } from "../../reducers/initialStates";
import { useSelector, useDispatch, Provider } from "react-redux";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { jssPreset } from "@material-ui/core";
import { useHistory } from "react-router";

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
  const articles = { items: [] };
  const state = {
    releaseNotes,
    productVersions,
    articles
  };
  beforeEach(() => {
    store = mockStore(state);
  });

  const props = {
    match: { params: { id: 0 } } // Router props
  };

  it("Renders without crash with no props", () => {
    useHistory.mockImplementation(() => jest.fn());
    const screen = mount(
      <Provider store={store}>
        <ReleaseEditorScreen {...props} />
      </Provider>
    );
  });
});
