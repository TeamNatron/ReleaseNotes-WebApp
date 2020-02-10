import Axios from "axios";

export function login(paramEmail, paramPassword) {
  Axios.interceptors.request.use(request => {
    return request;
  });

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
    document.cookie = "access_token=" + response.data.accessToken;
  });
}
