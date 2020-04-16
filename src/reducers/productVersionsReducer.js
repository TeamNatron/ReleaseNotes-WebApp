import update from "immutability-helper";
import { productVersions } from "./initialStates";
import {
  FETCH_VERSIONS_PENDING,
  FETCH_VERSIONS_SUCCESS,
  FETCH_VERSIONS_ERROR,
} from "../actions/productVersionsActions";

const initialState = productVersions;
export function productVersionsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_VERSIONS_PENDING:
      return update(state, {
        pending: { $set: true },
      });

    case FETCH_VERSIONS_SUCCESS:
      return update(state, {
        pending: { $set: false },
        items: { $set: action.payload },
        error: { $set: null },
      });
    case FETCH_VERSIONS_ERROR:
      return update(state, {
        pending: { $set: false },
        error: { $set: action.payload },
      });
    default:
      return state;
  }
}
