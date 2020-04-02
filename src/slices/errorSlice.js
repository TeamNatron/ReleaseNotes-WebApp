export const errorReducer = (state = {}, action) => {
  const { type, payload } = action;
  const matches = /(.*)(Error)/.exec(type);
  // not an Error action, so we ignore them

  // Get current time and date
  var today = new Date();
  var date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    ":" +
    today.getTime();

  if (!matches) {
    return state;
  }
  if (payload) {
    if (payload.response) {
      // The api-server returns these weird responses where they are packaged in named objects with arrays
      // This handling will ensure that the first object field's array will get turned in to a string and
      var errObj = payload.response.data[Object.keys(payload.response.data)[0]];
      var errMsg = "";
      if (Array.isArray(errObj)) {
        errMsg = arrayToString(errObj);
        return { text: errMsg, occured: date };
      }
    }
    return {
      text: payload.response ? payload.response.data : payload.error,
      occured: date
    };
  }
  return state;
};

export const errorSelector = state => {
  if (!state.error) {
    return "";
  }
  return state.error;
};

const arrayToString = array => {
  var result = "";
  array.forEach(element => {
    result += element.toString();
  });
  return result;
};
