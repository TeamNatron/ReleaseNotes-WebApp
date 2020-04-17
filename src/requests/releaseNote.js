import Axios from "axios";
import { getAuthToken } from "../handlers/cookieHandler";

export function getReleaseNotes() {
  return Axios.get("releasenote", {
    withCredentials: false,
    headers: {
      "Access-Control-Request-Headers": "Content-Type",
      Authorization: "Bearer " + getAuthToken(),
    },
  });
}
