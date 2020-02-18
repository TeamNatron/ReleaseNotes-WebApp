import Axios from "axios";
import { setAuthToken } from "../handlers/cookieHandler";

export function login(paramEmail, paramPassword) {
  return Axios.post(
    "login",
    {
      email: paramEmail,
      password: paramPassword
    },
    {
      withCredentials: false,
      headers: {
        ["Access-Control-Request-Headers"]: "Content-Type"
      }
    }
  ).then(response => {
    setAuthToken(response.data.accessToken);
  });
}
