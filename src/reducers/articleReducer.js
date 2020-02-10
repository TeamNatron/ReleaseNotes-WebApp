import { CREATE, DELETE } from "../actions/articleActions";

const initialState = {
  byId: []
};

export default function(state = initialState, action) {
  switch (action.type) {
      
    case CREATE:
      //TODO
      return state;

    case DELETE:
      //TODO
      return state;

    default:
      return state;
  }
}
