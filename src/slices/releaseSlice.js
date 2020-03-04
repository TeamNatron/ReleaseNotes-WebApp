import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

// First, define the reducer and action creators via `createSlice`
export const releaseSlice = createSlice({
  name: "releases",
  initialState: { pending: false, error: "", items: [] },
  reducers: {
    getPending(state, action) {
      state.pending = true;
    },
    getSuccess(state, action) {
      state.pending = false;
      state.items = action.payload;
    },
    getError(state, action) {
      state.pending = false;
      state.error = action.payload;
    },
    putIsPublicPending: state => {
      state.pending = true;
    },
    putIsPublicSuccess: (state, action) => {
      state.pending = false;
      const newValue = action.payload.data.isPublic;
      state.items.find(obj => {
        if (obj.id == action.payload.id) {
          obj.isPublic = newValue;
        }
      });
    },
    putIsPublicError: (state, action) => {
      state.pending = false;
      state.error = action.payload;
    }
  }
});

// Destructure and export the plain action creators
export const {
  getPending,
  getSuccess,
  getError,
  putIsPublicPending,
  putIsPublicSuccess,
  putIsPublicError
} = releaseSlice.actions;

// Thunk for fetching
export const fetchReleases = () => async dispatch => {
  dispatch(getPending());
  Axios.get("/releases")
    .then(res => {
      dispatch(getSuccess(res.data));
    })
    .catch(err => dispatch(getError(err)));
};

// Thunk for updating isPublic
export const updateIsPublic = (id, isPublic) => async dispatch => {
  dispatch(putIsPublicPending());
  Axios.put("/releases/" + id, { isPublic: isPublic })
    .then(res => {
      dispatch(putIsPublicSuccess({ id: id, data: res.data }));
    })
    .catch(err => {
      dispatch(putIsPublicError(err));
    });
};

// https://github.com/reduxjs/redux-toolkit/blob/master/docs/usage/usage-guide.md
