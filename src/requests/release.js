import Axios from "axios";
import { getAuthToken } from "../handlers/cookieHandler";

export function saveRelease(release) {
  return Axios.post(
    "release",
    {
      email: paramEmail,
      password: paramPassword
    },
    {
      withCredentials: false,
      headers: {
        ["Access-Control-Request-Headers"]: "Content-Type",
        ["Authorization"]: "Bearer " + getAuthToken()
      }
    }
  );
}
