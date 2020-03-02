import {
  FETCH_ARTICLES_PENDING,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_ERROR,
  SAVE_RELEASE_PENDING,
  SAVE_RELEASE_SUCCESS,
  SAVE_RELEASE_ERROR
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

    case SAVE_RELEASE_PENDING:
      return update(state, {
        pending: { $set: true }
      });
    case SAVE_RELEASE_SUCCESS:
      const index = state.items.findIndex(item => item.id == action.payload.id);
      if (index !== -1 || !index || !action.payload) {
        return update(state, {
          pending: { $set: false },
          items: { [index]: { $set: action.payload } }
        });
      } else {
        return update(state, {
          pending: { $set: false }
        });
      }
    case SAVE_RELEASE_ERROR:
      return update(state, {
        pending: { $set: false },
        error: { $set: action.payload }
      });

    default:
      return state;
  }
}
