import { createReducer, createAction } from "@reduxjs/toolkit";
import Axios from "axios";
import { updateInArray, deleteInArray } from "../utils/stateUtil";
import { saveSuccess as saveReleaseNoteSuccess } from "./releaseNoteSlice";

// ACTIONS
export const name = "release/";
export const getPending = createAction(name + "getPending");
export const getSuccess = createAction(name + "getSuccess");
export const getError = createAction(name + "getError");

export const getByIdSuccess = createAction(name + "getByIdSuccess");
export const getByIdError = createAction(name + "getByIdError");
export const getByIdPending = createAction(name + "getByIdPending");

export const putByIdPending = createAction(name + "putByIdPending");
export const putByIdSuccess = createAction(name + "putByIdSuccess");
export const putByIdError = createAction(name + "putByIdError");

export const postPending = createAction(name + "postPending");
export const postError = createAction(name + "postError");
export const postSuccess = createAction(name + "postSuccess");

export const deletePending = createAction(name + "deletePending");
export const deleteError = createAction(name + "deleteError");
export const deleteSuccess = createAction(name + "deleteSuccess");

// REDUCER
const initialState = {
  pending: false,
  error: "",
  items: [],
  successMsg: "",
};
export const releaseReducer = createReducer(initialState, {
  [getSuccess]: (state, action) => {
    state.items = action.payload;
  },
  [getByIdSuccess]: (state, action) => {
    updateInArray(state, action);
  },
  [putByIdSuccess]: (state, action) => {
    updateInArray(state, action);
    state.successMsg = action.payload.response;
  },
  [saveReleaseNoteSuccess]: (state, action) => {
    // release note updated, update affected releases
    state.items.forEach((release) => {
      const index = release.releaseNotes.findIndex(
        (obj) => obj.id == action.payload.id
      );
      if (index !== -1) {
        release.releaseNotes[index] = action.payload.data;
      }
    });
  },

  [deleteSuccess]: (state, action) => {
    deleteInArray(state, action);
  },
  [postSuccess]: (state, action) => {
    state.successMsg = action.payload;
  },
});

// THUNKS
export const fetchReleases = (queryParameters) => async (dispatch) => {
  var query = "";
  if (queryParameters) {
    const id = queryParameters.product;
    const sortKey = queryParameters.sort;
    query = (id ? "?product=" + id : "") + (sortKey ? "&sort=" + sortKey : "");
  }

  dispatch(getPending());
  Axios.get("/releases" + query)
    .then((res) => {
      dispatch(getSuccess(res.data));
    })
    .catch((err) => dispatch(getError(err)));
};

// Thunk for fetching
export const fetchReleaseById = (id) => async (dispatch) => {
  dispatch(getByIdPending({ id }));
  Axios.get("/releases/" + id)
    .then((res) => {
      dispatch(getByIdSuccess({ id, data: res.data }));
    })
    .catch((error) => {
      dispatch(getByIdError({ id, error }));
    });
};

export const putReleaseById = (id, data) => async (dispatch) => {
  dispatch(putByIdPending({ id }));
  Axios.put("/releases/" + id, data)
    .then((res) => {
      dispatch(
        putByIdSuccess({ id: id, data: res.data, response: res.statusText })
      );
    })
    .catch((error) => {
      dispatch(putByIdError({ id, error }));
    });
};

/**
 *
 * @param {The release to create} releaseToCreate
 * @param {A boolean flag that tells the function that
 *          the release contains raw work items, that
 *          requires a specific endpoint} raw
 */
export function postRelease(releaseToCreate, raw) {
  return (dispatch) => {
    let url = "releases";
    dispatch(postPending());
    if (raw) {
      url += "/azure";
    }
    return Axios.post(url, releaseToCreate)
      .then((response) => {
        dispatch(
          postSuccess({ message: "Opprettelse av release var vellykket!" })
        );
      })
      .catch((error) => {
        dispatch(postError(error));
      });
  };
}

export function deleteRelease(id) {
  return (dispatch) => {
    dispatch(deletePending());
    return Axios.delete("/releases/" + id)
      .then((response) => {
        dispatch(deleteSuccess({ id }));
      })
      .catch((error) => {
        dispatch(deleteError(error));
      });
  };
}

// https://github.com/reduxjs/redux-toolkit/blob/master/docs/usage/usage-guide.md

// SELECTORS
export const getSuccesMessage = (state) => {
  return state.releases.successMsg;
};
