import axios from "axios";
import store from '../reducers/store';

const request = async (apiPath, method = "GET", params = {}, data = {}) => {
  const headers = {};
  let url = apiPath;
  if (process.env.NODE_ENV === "development" && !url.startsWith("http://localhost:8000")) {
    url = "http://localhost:8000".concat(url);
  }
  const { token } = store.getState().auth;
  if (token) {
    headers["Authorization"] = "Token ".concat(token);
  }
  return axios({
    method,
    url: url,
    headers,
    params,
    data,
  });
};

export default request;
