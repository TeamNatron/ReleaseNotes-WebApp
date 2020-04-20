// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { Provider } from "react-redux";
import { Router, Route } from "react-router-dom";
import { store } from "./setupStore";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";
const AllTheProviders = (
  { children },
  {
    route = "/test-route",
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) => {
  if (!route) throw new Error("Uninstansiated route");
  const mockRoute = route;
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
    useLocation: () => ({ pathname: mockRoute }),
  }));
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route
          exact
          path={mockRoute}
          component={React.Children.only(children).type}
        />
      </Router>
    </Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as renderWithProdiders };
