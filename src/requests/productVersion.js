import Axios from "axios";

export function getProductVersions() {
  return Axios.get("productversions");
}
