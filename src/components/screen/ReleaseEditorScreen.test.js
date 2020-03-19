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
import { testScreenConformance } from "../../utils/test/testScreenConformance";

/*jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
  connect: jest.fn()
}));*/

jest.mock("react-router");

describe("<ReleaseEditorScreen /> ", () => {
  const props = {
    match: { params: { id: 0 } } // Router props
  };
  testScreenConformance(<ReleaseEditorScreen {...props} />);
  testScreenConformance(<ReleaseEditorScreen />);
});
