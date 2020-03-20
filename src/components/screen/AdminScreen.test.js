import React from "react";
import AdminScreen from "./AdminScreen";
import { testScreenConformance } from "../../utils/test/testScreenConformance";

/*jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
  connect: jest.fn()
}));*/

jest.mock("react-router");

describe("<AdminScreen />", () => {
  testScreenConformance(<AdminScreen />);
});
