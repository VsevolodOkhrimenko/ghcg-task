import {
  GET_TOKEN,
  SIGN_OUT,
  SIGN_UP_ERROR,
} from "./types";
import initialState from "./initialState";


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN:
      return Object.assign({}, state, {
        token: action.payload.token,
      });
    case SIGN_OUT:
      return Object.assign({}, state, {
        token: null,
      });
    case SIGN_UP_ERROR:
      return Object.assign({}, state, {
        loginError: action.payload.loginError,
      });
    default:
      return state;
  }
};


export default authReducer;
