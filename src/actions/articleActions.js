import Axios from "axios";

export const CREATE = "CREATE";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";

export const FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS";
export const FETCH_ARTICLES_PENDING = "FETCH_ARTICLES_PENDING";
export const FETCH_ARTICLES_ERROR = "FETCH_ARTICLES_ERROR";

export const SAVE_RELEASE_PENDING = "CREATE_RELEASE_PENDING";
export const SAVE_RELEASE_SUCCESS = "CREATE_RELEASE_SUCCESS";
export const SAVE_RELEASE_ERROR = "CREATE_RELEASE_ERROR";

export function fetchArticles(queryParameters) {
  var query = "";
  if (queryParameters) {
    const id = queryParameters.productId;
    const sortKey = queryParameters.sort;
    query = (id ? "?product=" + id : "") + (sortKey ? "&sort=" + sortKey : "");
  }

  return dispatch => {
    dispatch(actions.fetchArticlesPending());
    return Axios.get("/releases" + query)
      .then(response => {
        dispatch(actions.fetchArticlesSuccess(response.data));
      })
      .catch(error => {
        dispatch(actions.fetchArticlesError(error));
      });
  };
}

export function createRelease(releaseToCreate) {
  return dispatch => {
    dispatch(actions.saveReleasePending());
    return Axios.post("releases", releaseToCreate)
      .then(response => {
        dispatch(actions.saveReleaseSuccess());
      })
      .catch(error => {
        dispatch(actions.saveReleaseError(error));
      });
  };
}

export function updateRelease(updatedFields, id) {
  return dispatch => {
    dispatch(actions.saveReleasePending());
    return Axios.put("releases/" + id, updatedFields)
      .then(response => {
        dispatch(actions.saveReleaseSuccess(response));
      })
      .catch(error => {
        dispatch(actions.saveReleaseError(error));
      });
  };
}

export const actions = {
  saveReleasePending() {
    return {
      type: SAVE_RELEASE_PENDING
    };
  },
  saveReleaseSuccess(response) {
    return {
      type: SAVE_RELEASE_SUCCESS,
      payload: response
    };
  },
  saveReleaseError(error) {
    return {
      type: SAVE_RELEASE_ERROR,
      payload: error
    };
  },

  fetchArticlesPending() {
    return {
      type: FETCH_ARTICLES_PENDING
    };
  },

  fetchArticlesSuccess(response) {
    return {
      type: FETCH_ARTICLES_SUCCESS,
      payload: response
    };
  },

  fetchArticlesError(error) {
    return {
      type: FETCH_ARTICLES_ERROR,
      payload: error
    };
  }
};

// expmple thunk/axios action
// https://github.com/axios/axios
// https://github.com/reduxjs/redux-thunk
