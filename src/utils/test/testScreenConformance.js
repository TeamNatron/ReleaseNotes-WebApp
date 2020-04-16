import React from "react";
import { renderWithProdiders } from "../../setupTests";

/**
 * Tests things that are common for every screen
 * Returns the Enzyme Wrapper of the screen
 * @param {React component} screenToTest
 */
export const testScreenConformance = (screenToTest) => {
  if (!React.isValidElement(screenToTest)) {
    console.log("Parameter need to be a valid react element");
    return;
  }

  it("Renders without crash", () => {
    renderWithProdiders(screenToTest);
  });
};
