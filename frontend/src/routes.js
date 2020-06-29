import React, { Suspense } from 'react'
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom'
import Loader from './components/Loader';

const Dashboard = React.lazy(() => import('./containers/Dashboard'))
const Login = React.lazy(() => import('./containers/Login'))
const DetailTransaction = React.lazy(() => import('./containers/DetailTransaction'))


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      rest.token ?
        <Component {...props} />
        : <Redirect to="/login" />
    )}
  />
);


class Routes extends React.Component {
  render() {
    return (
      <Suspense fallback={<Loader/>}>
        <Switch>
          <Route path={"/login"} exact component={Login} />
          <PrivateRoute {...this.props} path={"/"} exact component={Dashboard} />
          <PrivateRoute {...this.props} path={"/transaction/:pk"} exact component={DetailTransaction} />
        </Switch>
      </Suspense>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.auth.token,
  };
}

export default connect(mapStateToProps)(Routes);
