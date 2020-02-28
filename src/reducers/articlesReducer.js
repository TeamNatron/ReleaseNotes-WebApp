import {
  FETCH_ARTICLES_PENDING,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
  CREATE_RELEASE_ERROR,
  CREATE_RELEASE_PENDING,
  CREATE_RELEASE_SUCCESS
} from "../actions/articleActions";
import { articles } from "./initialStates";
import update from "immutability-helper";

const initialState = articles;

export function articlesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ARTICLES_PENDING:
      return update(state, {
        pending: { $set: true }
      });

    case FETCH_ARTICLES_SUCCESS:
      return update(state, {
        pending: { $set: false },
        items: { $set: action.payload },
        error: { $set: null }
      });
    case FETCH_ARTICLES_ERROR:
      return update(state, {
        pending: { $set: false },
        error: { $set: action.payload }
      });

    case CREATE_RELEASE_PENDING:
      return update(state, {
        pending: { $set: true }
      });
    case CREATE_RELEASE_SUCCESS:
      return update(state, {
        pending: { $set: false }
      });
    case CREATE_RELEASE_ERROR:
      return update(state, {
        pending: { $set: false },
        error: { $set: action.payload }
      });

    default:
      return state;
  }
}
