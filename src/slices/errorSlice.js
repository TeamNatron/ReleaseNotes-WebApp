export const errorReducer = (state = {}, action) => {
  const { type, payload } = action;
  const matches = /(.*)(Error)/.exec(type);
  // not an Error action, so we ignore them
  if (!matches) {
    return state;
  }
  return {
    text: payload.response ? payload.response.data : payload.error
  };
};

export const errorMessageSelector = state => {
  return state.error.text;
};
