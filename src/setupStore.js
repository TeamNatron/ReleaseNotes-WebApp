import combinedReducers from "./slices/combinedReducers";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: combinedReducers,
});
