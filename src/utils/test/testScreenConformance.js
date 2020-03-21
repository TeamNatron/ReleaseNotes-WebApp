import React from "react";
import { Provider } from "react-redux";
import { useHistory } from "react-router";
import { store } from "../../setupStore";
import { Router } from "@material-ui/icons";
import { renderWithProdiders } from "../../setupTests";

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
    const rendered = renderWithProdiders(screenToTest);
  });
};
