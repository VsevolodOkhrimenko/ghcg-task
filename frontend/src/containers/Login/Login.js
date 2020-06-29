import React from "react";
import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";
import { connect } from 'react-redux';
import DocumentTitle from "react-document-title";
import { login } from '../../reducers/auth/actions';
import "./Login.scss";


const Login = (props) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    props.login(username, password);
  }

  return (
    <>
      <DocumentTitle title="Login" />
      <div className="container login-page">
        <Grid container className="vh-100" alignContent="center" alignItems="center" justify="center">
          <Grid item md={3} >
            <form className="form-signin" onSubmit={handleSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="inputUsername">Username</InputLabel>
                <Input name="username" required={true} type="text" id="inputUsername" aria-describedby="my-helper-text" />
              </FormControl>
              <FormControl fullWidth={true}>
                <InputLabel htmlFor="inputPassword">Password</InputLabel>
                <Input name="password" required={true} type="password" id="inputPassword" aria-describedby="my-helper-text" />
              </FormControl>
              <p style={{ color: 'red' }}>{props.loginError}</p>
              <Button variant="contained" color="primary" type="submit">Sign in</Button>
            </form>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    loginError: state.auth.loginError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login(username, password) {
      dispatch(login(username, password));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
