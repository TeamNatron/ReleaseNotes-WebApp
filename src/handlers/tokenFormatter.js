/**
 * Takes two parameters which is required, to make a base64 encoded token.
 * Returns an empty string if user and pat is not provided.
 *
 * @param {String} username The Azure username
 * @param {String} pat The Azure Personal Access Token
 *
 */
export const formatAzurePAT = (username, pat) => {
  if (username && pat) {
    return btoa(username + ":" + pat);
  }

  return "";
};
