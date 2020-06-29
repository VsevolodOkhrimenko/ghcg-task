import './TransferForm.scss';
import React, { useState, useEffect } from "react";
import {
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  TextField,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";
import request from '../../utils/request';
import { getTransactions, resetTransactions, createTransaction } from "../../reducers/transaction/actions";

const TransferForm = ({ getTransactions, resetTransactions, createTransaction }) => {
  const [reciever, setReciever] = useState('');
  const [amount, setAmount] = useState('');
  const [recievers, setRecievers] = useState([]);
  useEffect(() => {
    let url = '/api/recievers';
    request(url, 'GET').then((body) => {
      const { data } = body;
      setRecievers(data)
    }).catch((error) => {
      console.log(error);
    });
  }, [setRecievers]);
  const handleAmmountInput = (event) => {
    if (event.target.value < 1) {
      event.target.value = 1;
    }
    setAmount(event.target.value);
  }
  const handleChange = (event) => {
    setReciever(event.target.value);
  };

  const renderRecievers = () => {
    return recievers.map(reciever => (
      <MenuItem key={reciever['id']} value={reciever['id']}>{reciever['name']}</MenuItem>
    ));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createTransaction({amount: amount * -1, reciever: reciever});
    resetTransactions();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth={true}>
        <TextField id="fromAccount" label="From account" />
      </FormControl>
      <FormControl fullWidth={true}>
        <InputLabel id="select-label">To account *</InputLabel>
        <Select
          required={true}
          labelId="select-label"
          id="recieverSelect"
          value={reciever}
          onChange={handleChange}
        >
          {renderRecievers()}
        </Select>
      </FormControl>
      <FormControl fullWidth={true}>
        <TextField required={true} onInput={handleAmmountInput} id="amount" type="number" label="Amount" />
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    getTransactions: (filters, url) => dispatch(getTransactions(filters, url)),
    resetTransactions: () => dispatch(resetTransactions()),
    createTransaction: (data) => dispatch(createTransaction(data)),
  };
}

function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferForm);
