import axios from 'axios';
import history from '../../history';
import {
  GET_TOKEN,
  SIGN_OUT,
  SIGN_UP_ERROR,
} from "./types";


export function login(username, password) {
  return function action(dispatch) {
    const url = '/api-token-auth/';
    const data = {
      username: username,
      password: password,
    }
    axios.post(url, data).then((body) => {
      const { data } = body;
      dispatch({
        type: SIGN_UP_ERROR,
        payload: {
          loginError: null,
        },
      });
      dispatch({
        type: GET_TOKEN,
        payload: {
          token: data['token'],
        },
      });
      localStorage.setItem('accessToken', data['token']);
      const newPath = '/';
      history.push(newPath);
    }).catch((error) => {
      localStorage.setItem('accessToken', '');
      dispatch({
        type: SIGN_UP_ERROR,
        payload: {
          loginError: error.response.data.error ? error.response.data.error : error.response.data.non_field_errors[0],
        },
      });
    });
  }
}


export function logout() {
  return function action(dispatch) {
    localStorage.setItem('accessToken', '');
    dispatch({
      type: SIGN_OUT,
    });
    const newPath = '/login';
    history.push(newPath);
  }
}
