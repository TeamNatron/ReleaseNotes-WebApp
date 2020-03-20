import { testScreenConformance } from "../../utils/test/testScreenConformance";
import React from "react";
import LoginScreen from "./LoginScreen";
describe("< />", () => {
  testScreenConformance(<LoginScreen />);
});
