import Axios from "axios";
import { getAuthToken } from "../handlers/cookieHandler";

export function saveRelease(release) {
  return Axios.post(
    "releases",
    {
      ProductVersionId: release.productVersionId,
      Title: release.title,
      IsPublic: release.isPublic,
      ReleaseNotesId: release.releaseNotesIds,
    },
    {
      withCredentials: false,
      headers: {
        ["Access-Control-Request-Headers"]: "Content-Type",
        ["Authorization"]: "Bearer " + getAuthToken(),
      },
    }
  );
}
