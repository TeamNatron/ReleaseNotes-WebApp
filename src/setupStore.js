// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
import combinedReducers from "./reducers/combinedReducers";
import { configureStore } from "@reduxjs/toolkit";

// const initialstate = {};
// const middleware = [thunk];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// export const store = createStore(
//   combinedReducers,
//   initialstate,
//   composeEnhancers(applyMiddleware(...middleware))
// );

export const store = configureStore({
  reducer: combinedReducers
});
