import Axios from "axios";

export const CREATE = "CREATE";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";

export const FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS";
export const FETCH_ARTICLES_PENDING = "FETCH_ARTICLES_PENDING";
export const FETCH_ARTICLES_ERROR = "FETCH_ARTICLES_ERROR";

export const CREATE_RELEASE_PENDING = "CREATE_RELEASE_PENDING";
export const CREATE_RELEASE_SUCCESS = "CREATE_RELEASE_SUCCESS";
export const CREATE_RELEASE_ERROR = "CREATE_RELEASE_ERROR";

export function fetchArticles(queryParameters) {
  var query = "";
  if (queryParameters) {
    const id = queryParameters.productId;
    const sortKey = queryParameters.sort;
    query = (id ? "?product=" + id : "") + (sortKey ? "&sort=" + sortKey : "");
  }

  return dispatch => {
    dispatch(actions.fetchArticlesPending());
    return Axios.get("/articles" + query)
      .then(response => {
        dispatch(actions.fetchArticlesSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function createRelease(releaseToCreate) {
  return dispatch => {
    dispatch(actions.createReleasePending());
    return Axios.post("releases", releaseToCreate)
      .then(response => {
        dispatch(actions.createReleaseSuccess());
      })
      .catch(error => {
        dispatch(actions.createReleaseError(error));
      });
  };
}

export const actions = {
  createReleasePending() {
    return {
      type: CREATE_RELEASE_PENDING
    };
  },
  createReleaseSuccess() {
    return {
      type: CREATE_RELEASE_SUCCESS
    };
  },
  createReleaseError(error) {
    return {
      type: CREATE_RELEASE_ERROR,
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
