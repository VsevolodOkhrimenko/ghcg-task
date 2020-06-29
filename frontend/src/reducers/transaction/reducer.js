import {
  GET_TRANSACTIONS_REQUEST,
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTION_SUCCESS,
  GET_TRANSACTIONS_FAILURE,
  GET_TRANSACTION_FAILURE,
  CREATE_TRANSACTIONS_REQUEST,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_FAILURE,
  RESET_TRANSACTIONS,
} from "./types";
import initialState from "./initialState";


const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TRANSACTIONS_REQUEST:
      return Object.assign({}, state, {
        getTransactionsError: null,
        getTransactionError: null,
        isFetching: true,
      });
    case GET_TRANSACTIONS_SUCCESS:
      return Object.assign({}, state, {
        transactions: state.transactions.concat(action.payload.transactions),
        getTransactionsError: null,
        getTransactionError: null,
        next: action.payload.next,
        isFetching: false,
      });
    case GET_TRANSACTION_SUCCESS:
      return Object.assign({}, state, {
        transaction: action.payload.transaction,
        getTransactionsError: null,
        getTransactionError: null,
        isFetching: false,
      });
    case GET_TRANSACTIONS_FAILURE:
      return Object.assign({}, state, {
        getTransactionsError: action.payload.getTransactionsError,
        getTransactionError: null,
        isFetching: false
      });
    case GET_TRANSACTION_FAILURE:
      return Object.assign({}, state, {
        getTransactionError: action.payload.getTransactionError,
        getTransactionsError: null,
        isFetching: false
      });
    case CREATE_TRANSACTIONS_REQUEST:
      return Object.assign({}, state, {
        createTransactionError: null,
        isFetchingCreate: true,
      });
    case CREATE_TRANSACTION_SUCCESS:
      return Object.assign({}, state, {
        createTransactionError: null,
        isFetchingCreate: false
      });
    case CREATE_TRANSACTION_FAILURE:
      return Object.assign({}, state, {
        createTransactionError: action.payload.createTransactionError,
        isFetchingCreate: false
      });
    case RESET_TRANSACTIONS:
      return Object.assign({}, state, {
        transactions: [],
        getTransactionsError: null,
        getTransactionError: null,
        next: null,
        isFetching: false,
      });
    default:
      return state;
  }
};


export default transactionReducer;
