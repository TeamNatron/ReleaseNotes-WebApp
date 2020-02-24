import {
  FETCH_RELEASENOTE_PENDING,
  FETCH_RELEASENOTE_SUCCESS,
  FETCH_RELEASENOTE_ERROR,
  PUT_RELEASENOTE_PENDING,
  PUT_RELEASENOTE_SUCCESS,
  PUT_RELEASENOTE_ERROR
} from "../actions/releaseNoteActions";
import { releaseNotes, releaseNote } from "./initialStates";
import update from "immutability-helper";

const initialState = releaseNotes;
// reducer for all release notes
export function releaseNotesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_RELEASENOTE_PENDING:
      return doUpdateItem(state, action);
    case FETCH_RELEASENOTE_SUCCESS:
      return doUpdateItem(state, action);
    case FETCH_RELEASENOTE_ERROR:
      return doUpdateItem(state, action);

    case PUT_RELEASENOTE_PENDING:
      return doUpdateItem(state, action);
    case PUT_RELEASENOTE_SUCCESS:
      return doUpdateItem(state, action);
    case PUT_RELEASENOTE_ERROR:
      return doUpdateItem(state, action);

    default:
      return state;
  }
}

function doUpdateItem(state, action) {
  const index = state.items.findIndex(r => r.item.id === action.id);
  console.log(index);
  if (index === -1) {
    return update(state, {
      items: {
        $push: [releaseNoteReducer(releaseNote, action)]
      }
    });
  }
  return update(state, {
    items: {
      [index]: { $set: releaseNoteReducer(state.items[index], action) }
    }
  });
}

// reducer for a single release note
function releaseNoteReducer(state = releaseNote, action) {
  switch (action.type) {
    case FETCH_RELEASENOTE_PENDING:
      return update(state, {
        pending: { $set: true }
      });
    case FETCH_RELEASENOTE_SUCCESS:
      return update(state, {
        pending: { $set: false },
        item: { $set: action.payload },
        error: { $set: null }
      });
    case FETCH_RELEASENOTE_ERROR:
      return update(state, {
        pending: { $set: false },
        error: { $set: action.payload }
      });
    default:
      return state;
  }
}
