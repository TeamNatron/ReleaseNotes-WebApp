import {
  FETCH_RELEASE_NOTES_PENDING,
  FETCH_RELEASE_NOTES_SUCCESS,
  FETCH_RELEASE_NOTES_ERROR
} from "../actions/releaseNoteActions";
import { releasNotes } from "./initialStates";
import update from "immutability-helper";

const initialStates = releasNotes;

export function releaseNoteReducer(state = initialStates, action) {
  switch (action.tpye) {
    case FETCH_RELEASE_NOTES_PENDING:
      return update(state, {
        pending: { $set: true }
      });

    case FETCH_RELEASE_NOTES_SUCCESS:
      return update(state, {
        pending: { $set: false },
        items: { $set: action.payload },
        error: { $set: null }
      });

    case FETCH_RELEASE_NOTES_ERROR:
      return update(state, {
        pending: { $set: false },
        error: { $set: action.payload }
      });

    default:
      return state;
  }
}
