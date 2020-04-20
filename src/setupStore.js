import combinedReducers from "./reducers/combinedReducers";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: combinedReducers,
});
