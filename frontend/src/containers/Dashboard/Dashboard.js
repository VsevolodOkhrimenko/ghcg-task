import "./Dashboard.scss";
import React, { useEffect, useState } from "react";
import DocumentTitle from "react-document-title";
import {
  Grid,
  Card,
  CardContent,
  List,
  AppBar,
  Toolbar,
  InputBase,
  ButtonGroup,
  Button
} from "@material-ui/core";
import { connect } from "react-redux";
import { getTransactions, resetTransactions } from "../../reducers/transaction/actions";
import Transaction from "../../components/Transaction";
import TransferForm from "../../components/TransferForm";


const Dashboard = ({getTransactions, transactions, next, isFetching, resetTransactions}) => {
  const [filters, setFilters] = useState({order_by: "-created"});
  useEffect(() => {
    resetTransactions();
    getTransactions();
  }, [resetTransactions, getTransactions]);

  let timeout = null;
  const handleSortingFiltering = (order_by) => {
    resetTransactions();
    const currentFilters = filters;
    currentFilters['order_by'] = order_by;
    setFilters(currentFilters);
    getTransactions(currentFilters);
  }

  const handleSearchInput = (event) => {
    const search = event.target.value;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      resetTransactions();
      const currentFilters = filters;
      currentFilters['search'] = search;
      setFilters(currentFilters);
      getTransactions(currentFilters);
    }, 2000);
  }

  const renderTransactionsList = () => {
    return transactions.map((transaction, index) => (
      <Transaction key={transaction['id']} transactionData={transaction} />
      ));
  }

  const transactionsScroll = (event) => {
    const { clientHeight, scrollTop, scrollHeight } = event.target;
    const shouldScroll = scrollHeight - scrollTop === clientHeight;
    if (shouldScroll && next && !isFetching) {
      getTransactions(filters, next);
    }
  }

  return (
    <>
      <DocumentTitle title="Dashboard" />
      <div className="container dashboard">
        <Grid justify="center" container spacing={5} className="cart-caontainer">
          <Grid item md={2}>
            <Card square>
              <CardContent>
                <TransferForm />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={6}>
            <Card square style={{ position: 'relative' }}>
              <AppBar position="static">
                <Toolbar>
                  <Grid container spacing={5} className="tool-bar">
                    <Grid item md={6}>
                      <InputBase
                        placeholder="Search…"
                        onInput={handleSearchInput}
                        inputProps={{ 'aria-label': 'search' }}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <span>Sort by:</span>
                      <ButtonGroup color="default" aria-label="outlined primary button group">
                        <Button
                          variant={filters['order_by'] === "-created" ? "contained" : "outlined"}
                          onClick={() => { handleSortingFiltering("-created") }}
                        >
                          DATE
                        </Button>
                        <Button
                          variant={filters['order_by'] === "-amount" ? "contained" : "outlined"}
                          onClick={() => { handleSortingFiltering("-amount") }}
                        >
                          BENEFICARY
                        </Button>
                        <Button
                          variant={filters['order_by'] === "amount" ? "contained" : "outlined"}
                          onClick={() => { handleSortingFiltering("amount") }}
                        >
                          AMOUNT
                        </Button>
                      </ButtonGroup>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
              { isFetching ?
                <div className="loader">
                  <div className="lds-dual-ring"></div>
                </div> : null }
              <CardContent onScroll={transactionsScroll} className="transactions-list">
                <List component="nav">
                  {renderTransactionsList()}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    getTransactions: (filters, url) => dispatch(getTransactions(filters, url)),
    resetTransactions: () => dispatch(resetTransactions()),
  };
}

function mapStateToProps(state) {
  return {
    transactions: state.transaction.transactions,
    isFetching: state.transaction.isFetching,
    next: state.transaction.next,
    getTransactionsError: state.transaction.getTransactionsError,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);