import Axios from "axios";
import { getAuthToken } from "../handlers/cookieHandler";

// vurder å legge til for om isPublic: true/false;
export const FETCH_RELEASE_NOTES_PENDING = "fetchReleaseNotesPending";
export const FETCH_RELEASE_NOTES_SUCCESS = "fetchReleaseNotesSuccess";
export const FETCH_RELEASE_NOTES_ERROR = "fetchReleaseNotesError";

export function fetchReleaseNotes() {
  return dispatch => {
    dispatch(actions.fetchReleaseNotesPending());
    return Axios.get("releasenote", {
      withCredentials: false,
      headers: {
        ["Access-Control-Request-Headers"]: "Content-Type",
        ["Authorization"]: "Bearer " + getAuthToken()
      }
    })
      .then(res => {
        dispatch(actions.fetchReleaseNotesPending(res.data));
      })
      .catch(error => {
        dispatch(actions.fetchReleaseNotesError(error));
      });
  };
}

export const actions = {
  fetchReleaseNotesPending() {
    return {
      type: FETCH_RELEASE_NOTES_PENDING
    };
  },

  fetchReleaseNotesSuccess(releaseNotes) {
    return {
      type: FETCH_RELEASE_NOTES_SUCCESS,
      payload: releaseNotes
    };
  },

  fetchReleaseNotesError(error) {
    return {
      type: FETCH_RELEASE_NOTES_ERROR,
      payload: error
    };
  }
};
