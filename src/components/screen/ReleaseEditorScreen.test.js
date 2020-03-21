import React from "react";
import ReleaseEditorScreen from "./ReleaseEditorScreen";
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
  testScreenConformance(<ReleaseEditorScreen />);
});
