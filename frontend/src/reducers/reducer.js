import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import transactionReducer from "./transaction/reducer";

const reducer = combineReducers({
  auth: authReducer,
  transaction: transactionReducer,
});

export default reducer;
