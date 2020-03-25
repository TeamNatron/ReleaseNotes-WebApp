import Axios from "axios";
import { getAuthToken } from "../handlers/cookieHandler";

export function registerNewUser(paramEmail, paramPassword) {
  return Axios.post(
    "users",
    {
      email: paramEmail,
      password: paramPassword
    },
    {
      withCredentials: false,
      headers: {
        "Access-Control-Request-Headers": "Content-Type",
        Authorization: "Bearer " + getAuthToken()
      }
    }
  );
}

export function changePassword(paramPassword, id) {
  return Axios.put(
    "users/" + id,
    {
      password: paramPassword
    },
    {
      withCredentials: false,
      headers: {
        "Access-Control-Request-Headers": "Content-Type",
        Authorization: "Bearer " + getAuthToken()
      }
    }
  );
}
