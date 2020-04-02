export const successReducer = (state = {}, action) => {
  const { type, payload } = action;
  const matches = /(.*)(Success)/.exec(type);
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

  console.log("payload");
  console.log(payload);
  console.log("matches");
  console.log(matches);
  if (matches && payload) {
    var message;
    if (payload.successMsg) message = payload.successMsg;
    else {
      message = payload.statusText;
    }
    console.log(message ? message : "Something went wrong");
    return {
      text: message,
      occured: date
    };
  }

  return state;
};

export const successSelector = state => {
  if (!state.success) {
    return "";
  }
  return state.success;
};
