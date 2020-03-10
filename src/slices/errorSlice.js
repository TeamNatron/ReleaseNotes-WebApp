export const errorReducer = (state = {}, action) => {
  const { type, payload } = action;
  const matches = /(.*)(Error)/.exec(type);
  // not an Error action, so we ignore them
  if (!matches) {
    return state;
  }
  if (payload) {
    return {
      text: payload.response ? payload.response.data : payload.error
    };
  }
  return state;
};

export const errorMessageSelector = state => {
  if (!state.error.text) {
    return "";
  }
  return state.error.text;
};
