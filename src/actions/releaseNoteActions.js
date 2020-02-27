import Axios from "axios";

export const CREATE = "CREATE";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";

export const FETCH_RELEASENOTE_SUCCESS = "FETCH_RELEASENOTE_SUCCESS";
export const FETCH_RELEASENOTE_PENDING = "FETCH_RELEASENOTE_PENDING";
export const FETCH_RELEASENOTE_ERROR = "FETCH_RELEASENOTE_ERROR";

export const PUT_RELEASENOTE_SUCCESS = "PUT_RELEASENOTE_SUCCESS";
export const PUT_RELEASENOTE_PENDING = "PUT_RELEASENOTE_PENDING";
export const PUT_RELEASENOTE_ERROR = "PUT_RELEASENOTE_ERROR";

export function updateArticle(payload) {
  return {
    type: UPDATE,
    payload: payload
  };
}

export function fetchReleaseNote(id) {
  return dispatch => {
    dispatch(actions.fetchReleaseNotePending(id));
    return Axios.get("/releasenote/" + id)
      .then(response => {
        dispatch(actions.fetchReleaseNoteSuccess(response.data, id));
      })
      .catch(error => {
        actions.fetchReleaseNoteError(error, id);
      });
  };
}

export function putReleaseNote(id, note) {
  return dispatch => {
    dispatch(actions.putReleaseNotePending(id));
    return Axios.put("/releasenote/" + id, note)
      .then(response => {
        console.log(response)
        dispatch(actions.putReleaseNoteSuccess(response.data, id));
      })
      .catch(error => {
        actions.putReleaseNoteError(error, id);
      });
  };
}

export const actions = {
  fetchReleaseNotePending(id) {
    return {
      type: FETCH_RELEASENOTE_PENDING,
      id
    };
  },

  fetchReleaseNoteSuccess(response, id) {
    return {
      type: FETCH_RELEASENOTE_SUCCESS,
      payload: response,
      id
    };
  },

  fetchReleaseNoteError(error, id) {
    return {
      type: FETCH_RELEASENOTE_ERROR,
      payload: error,
      id
    };
  },

  putReleaseNotePending(id) {
    return {
      type: PUT_RELEASENOTE_PENDING,
      id
    };
  },

  putReleaseNoteSuccess(response, id) {
    return {
      type: PUT_RELEASENOTE_SUCCESS,
      payload: response,
      id
    };
  },

  putReleaseNoteError(error, id) {
    return {
      type: PUT_RELEASENOTE_ERROR,
      payload: error,
      id
    };
  }
};

// expmple thunk/axios action
// https://github.com/axios/axios
// https://github.com/reduxjs/redux-thunk
