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
import request from '../../utils/request';

export function getTransactions(filters = {}, next=null) {
  return function action(dispatch) {
    let url = '/api/transactions';
    if (next) {
      url = next;
    }
    dispatch({ type: GET_TRANSACTIONS_REQUEST });
    request(url, 'GET', filters).then((body) => {
      const { data } = body;
      dispatch({
        type: GET_TRANSACTIONS_SUCCESS,
        payload: {
          transactions: data['results'],
          next: data['next'],
        },
      });
    }).catch((error) => {
      const errorData = error.response;
      console.log(errorData)
      dispatch({
        type: GET_TRANSACTIONS_FAILURE,
        payload: {
          getTransactionsError: errorData,
        },
      });
    });
  }
}

export function resetTransactions() {
  return function action(dispatch) {
    dispatch({
      type: RESET_TRANSACTIONS,
    });
  }
}

export function getTransaction(pk) {
  return function action(dispatch) {
    const url = '/api/transactions/'.concat(pk);
    dispatch({ type: GET_TRANSACTIONS_REQUEST });
    request(url, 'GET').then((body) => {
      const { data } = body;
      dispatch({
        type: GET_TRANSACTION_SUCCESS,
        payload: {
          transaction: data,
        },
      });
    }).catch((error) => {
      const errorData = error.response;
      console.log(errorData)
      dispatch({
        type: GET_TRANSACTION_FAILURE,
        payload: {
          loginError: errorData,
        },
      });
    });
  }
}

export function createTransaction(transactionData) {
  return function action(dispatch) {
    const url = '/api/transactions';
    dispatch({ type: CREATE_TRANSACTIONS_REQUEST });
    request(url, 'POST', {}, transactionData).then((body) => {
      const { data } = body;
      dispatch({
        type: CREATE_TRANSACTION_SUCCESS,
        payload: {
          transaction: data,
        },
      });
      dispatch(getTransactions());
    }).catch((error) => {
      const errorData = error.response;
      console.log(errorData)
      dispatch({
        type: CREATE_TRANSACTION_FAILURE,
        payload: {
          loginError: errorData,
        },
      });
    });
  }
}
