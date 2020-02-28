import Axios from "axios";

export const FETCH_VERSIONS_SUCCESS = "FETCH_VERSIONS_SUCCESS";
export const FETCH_VERSIONS_PENDING = "FETCH_VERSIONS_PENDING";
export const FETCH_VERSIONS_ERROR = "FETCH_VERSIONS_ERROR";

export function fetchProductVersions() {
  return dispatch => {
    dispatch(actions.fetchProductVersionsPending());
    return Axios.get("productversions")
      .then(response => {
        dispatch(actions.fetchProductVersionsSuccess(response.data));
      })
      .catch(error => {
        dispatch(actions.fetchProductVersionsError(error))
      });
  };
}

export const actions = {
  fetchProductVersionsPending() {
    return {
      type: FETCH_VERSIONS_PENDING
    };
  },

  fetchProductVersionsSuccess(response) {
    return {
      type: FETCH_VERSIONS_SUCCESS,
      payload: response
    };
  },

  fetchProductVersionsError(error) {
    return {
      type: FETCH_VERSIONS_ERROR,
      payload: error
    };
  }
};