/**
 * @param {String} authToken
 * @example Axios.get(url, authHeader("9u0fu8u94utgj03=="))
 */
export const authHeader = (authToken) => {
  var headerObj = {
    headers: {
      Authorization: "Basic " + authToken,
    },
  };
  return headerObj;
};
