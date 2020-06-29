const initialState = {
  transactions: [],
  transaction: {
    reciever: {}
  },
  getTransactionsError: null,
  getTransactionError: null,
  createTransactionError: null,
  isFetching: false,
  isFetchingCreate: false,
  next: null,
};

export default initialState;
