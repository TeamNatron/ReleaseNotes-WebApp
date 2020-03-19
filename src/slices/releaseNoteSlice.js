import { createAction, createReducer } from "@reduxjs/toolkit";
import Axios from "axios";

const name = "releaseNote/";
export const getPending = createAction(name + "getPending");
export const getError = createAction(name + "getError");
export const getSuccess = createAction(name + "getSuccess");

export const getByIdPending = createAction(name + "getByIdPending");
export const getByIdError = createAction(name + "getByIdError");
export const getByIdSuccess = createAction(name + "getByIdSuccess");

export const savePending = createAction(name + "savePending");
export const saveError = createAction(name + "saveError");
export const saveSuccess = createAction(name + "saveSuccess");

export const releaseNoteReducer = createReducer(
  { items: [] },
  {
    [getSuccess]: (state, action) => {
      state.items = action.payload;
    },
    [saveSuccess]: (state, action) => {
      updateInArray(state, action);
    },
    [getByIdSuccess]: (state, action) => {
      updateInArray(state, action);
    }
  }
);

// THUNKS
export function fetchReleaseNoteById(id) {
  return dispatch => {
    dispatch(getByIdPending({ id }));
    return Axios.get("/releasenote/" + id)
      .then(response => {
        dispatch(getByIdSuccess({ data: response.data, id }));
      })
      .catch(error => {
        getByIdError({ error, id });
      });
  };
}

export function fetchReleaseNotes(_query) {
  const query = _query ? _query : "";
  return dispatch => {
    dispatch(getPending());
    return Axios.get("/releasenote" + query)
      .then(res => {
        dispatch(getSuccess(res.data));
      })
      .catch(error => {
        getError(error);
      });
  };
}

export function putReleaseNote(id, note) {
  return dispatch => {
    dispatch(savePending({ id }));
    return Axios.put("/releasenote/" + id, note)
      .then(response => {
        dispatch(saveSuccess({ data: response.data, id }));
      })
      .catch(error => {
        saveError({ error, id });
      });
  };
}

  export function postReleaseNote(note) {
    return dispatch => {
      dispatch(savePending());
      return Axios.post("/releasenote/", note)
        .then(response => {
          dispatch(saveSuccess({data: response.data, id: response.data.id}));
        })
        .catch(error => {
          saveError({error});
        });
    };
  }

// UTIL
const updateInArray = (state, action) => {
  let index = state.items.findIndex(obj => obj.id == action.payload.id);
  if (index === -1) {
    state.items.push(action.payload.data);
  } else {
    state.items[index] = action.payload.data;
  }
};
