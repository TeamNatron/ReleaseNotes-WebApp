import { createAction, createReducer } from "@reduxjs/toolkit";
import Axios from "axios";
import { updateInArray, deleteInArray } from "../utils/stateUtil";

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

export const deletePending = createAction(name + "deletePending");
export const deleteError = createAction(name + "deleteError");
export const deleteSuccess = createAction(name + "deleteSuccess");

export const releaseNoteReducer = createReducer(
  { items: [] },
  {
    [getSuccess]: (state, action) => {
      state.items = action.payload.data;
    },
    [saveSuccess]: (state, action) => {
      updateInArray(state, action);
    },
    [getByIdSuccess]: (state, action) => {
      updateInArray(state, action);
    },
    [deleteSuccess]: (state, action) => {
      deleteInArray(state, action);
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
        dispatch(getSuccess({ data: res.data }));
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
        dispatch(saveSuccess({ data: response.data, id: response.data.id }));
      })
      .catch(error => {
        saveError({ error });
      });
  };
}
export function deleteReleaseNote(id) {
  return dispatch => {
    dispatch(deletePending());
    return Axios.delete("/releasenote/" + id)
      .then(response => {
        dispatch(deleteSuccess({ id }));
      })
      .catch(error => {
        dispatch(deleteError(error));
      });
  };
}
