import './Transaction.scss'
import React from "react";
import {
  ListItemText,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import parseDate from '../../helpers/parseDate';

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

const statusClassess = [
  "send",
  "received",
  "payed"
];

const Transaction = ({ transactionData }) => {
  let history = useHistory();
  function getPrettyDate(date) {
    return `${monthsNames[date.getMonth()]} ${date.getDate()}`;
  }
  function getPrettyAmount(amount) {
    if (amount < 0) {
      return `-$${amount * -1}`
    }
    return `+$${amount}`
  }
  function getStatusClass(status) {
    if (status < 3) {
      return statusClassess[status];
    }
    return "send";
  }
  return (
    <ListItem onClick={() => {history.push(`/transaction/${transactionData['id']}`);}} button className={`transaction ${getStatusClass(transactionData['status'])}`}>
      {getPrettyDate(parseDate(transactionData["created"]))}
      <ListItemAvatar>
        <Avatar
          alt={transactionData['reciever']['name']}
          src={transactionData['reciever']['image_url']}
        />
      </ListItemAvatar>
      <ListItemText
        id={transactionData['id']}
        primary={transactionData['reciever']['name']}
        secondary={transactionData['payment_type']}
      />
      <ListItemSecondaryAction>
        {getPrettyAmount(transactionData['amount'])}
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default Transaction
