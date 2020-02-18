import Cookies from "js-cookie";

const ACCESS_TOKEN = "access_token";

export function getAuthToken() {
  return Cookies.get(ACCESS_TOKEN);
}

export function setAuthToken(accessToken) {
  Cookies.set(ACCESS_TOKEN, accessToken);
}
