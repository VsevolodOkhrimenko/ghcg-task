import "./DetailTransaction.scss";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import DocumentTitle from "react-document-title";
import request from '../../utils/request';
import parseDate from '../../helpers/parseDate';
import { getTransaction } from "../../reducers/transaction/actions";

const monthsNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "DEC"
];

const DetailTransaction = ({getTransaction, transaction, isFetching}) => {
  let { pk } = useParams();
  const [status, setStatus] = useState(transaction["status"]);
  useEffect(() => {
    getTransaction(pk);
  }, [getTransaction, pk]);

  function getPrettyDate(date) {
    return `${monthsNames[date.getMonth()]} ${date.getDate()}`;
  }

  function getPrettyAmount(amount) {
    if (amount < 0) {
      return `-$${amount * -1}`
    }
    return `+$${amount}`
  }

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    let url = '/api/transactions/'.concat(pk);
    request(url, 'PATCH', {}, {status: event.target.value}).then((body) => {
      const { data } = body;
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <DocumentTitle title="Transaction" />
      <Grid justify="center" container spacing={5} className="cart-caontainer">
        { (isFetching || !transaction["created"] )?
          <div className="loader">
            <div className="lds-dual-ring"></div>
          </div> : 
        <Grid item md={6}>
          <p>{getPrettyDate(parseDate(transaction["created"]))}</p>
          <p>{transaction['reciever']['name']}</p>
          <p>{transaction['payment_type']}</p>
          <p>{getPrettyAmount(transaction['amount'])}</p>
          <FormControl fullWidth={true}>
            <InputLabel id="select-label">Current status</InputLabel>
            <Select
              required={true}
              labelId="select-label"
              id="recieverSelect"
              value={status}
              onChange={handleStatusChange}
            >
              <MenuItem value={1}>Send</MenuItem>
              <MenuItem value={2}>Recieved</MenuItem>
              <MenuItem value={3}>Payed</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      }
      </Grid>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    getTransaction: (pk) => dispatch(getTransaction(pk)),
  };
}

function mapStateToProps(state) {
  return {
    transaction: state.transaction.transaction,
    isFetching: state.transaction.isFetching,
    getTransactionError: state.transaction.getTransactionError,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailTransaction);