import React from "react";
import { mount, shallow } from "enzyme";
import { Provider } from "react-redux";
import { useHistory } from "react-router";
import { store } from "../../setupStore";
import { Router } from "@material-ui/icons";

jest.mock("react-router");

/**
 * Tests things that are common for every screen
 * Returns the Enzyme Wrapper of the screen
 * @param {React component} screenToTest
 */
export const testScreenConformance = screenToTest => {
  if (!React.isValidElement(screenToTest)) {
    console.log("Parameter need to be a valid react element");
    return;
  }

  it("Renders without crash", () => {
    useHistory.mockImplementation(() => jest.fn());
    const attachTo = document.createElement("div");
    const wrapper = shallow(
      <Provider store={store}>
        <Router>{screenToTest}</Router>
      </Provider>,
      attachTo
    );
    const screen = wrapper.find(screenToTest.type);

    expect(wrapper.exists()).toBe(true);
    expect(screen.exists()).toBe(true);
  });
};
