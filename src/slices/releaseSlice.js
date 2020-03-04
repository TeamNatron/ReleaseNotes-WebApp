import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

// First, define the reducer and action creators via `createSlice`
export const releaseSlice = createSlice({
  name: " ",
  initialState: { pending: false, error: "", items: [] },
  reducers: {
    releasesFetchPending(state, action) {
      state.pending = true;
    },
    releasesFetchSuccess(state, action) {
      state.pending = false;
      state.items = action.payload;
    },
    releasesFetchError(state, action) {
      state.pending = false;
      state.error = action.payload;
    },
    updateIsPublic: () => {
      // Send requests
      // Modify state of specific release
      // Handle error
    }
  }
});

// Destructure and export the plain action creators
export const {
  releasesFetchPending,
  releasesFetchSuccess,
  releasesFetchError
} = releaseSlice.actions;

// Thunk for fetching
export const fetchReleases = () => async dispatch => {
  dispatch(releasesFetchPending());
  Axios.get("/releases")
    .then(res => {
      dispatch(releasesFetchSuccess(res.data));
    })
    .catch(err => dispatch(releasesFetchError(err)));
};

// https://github.com/reduxjs/redux-toolkit/blob/master/docs/usage/usage-guide.md
