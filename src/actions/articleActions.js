import Axios from "axios";

export const CREATE = "CREATE";
export const UPDATE = "UPDATE";
export const DELETE = "CREATE";

export function updateArticle(payload) {
  return {
    type: UPDATE,
    payload: payload
  };
}

// expmple thunk/axios action
// https://github.com/axios/axios
// https://github.com/reduxjs/redux-thunk
export function createArticleAsync(article) {
  return dispatch => {
    return Axios.create("/article", article)
      .then(response => {
        dispatch(createArticle(response));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function createArticle(article) {
  return {
    type: CREATE,
    payload: article
  };
}
