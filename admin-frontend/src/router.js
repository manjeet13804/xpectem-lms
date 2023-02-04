import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { connect } from 'react-redux';
import { MAIN_ROUTE } from 'constants/routes';
import App from './containers/App/App';
import asyncComponent from './helpers/AsyncFunc';

const {
  home,
  signin,
  forgotpassword,
  resetpassword,
  notFound,
  serverError,
} = MAIN_ROUTE;

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => (isLoggedIn ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: signin,
        }}
      />
    ))
    }
  />
);
const PublicRoutes = ({ history, isLoggedIn }) => (
  <ConnectedRouter basename="/admin/" history={history}>
    <Switch>
      <Route
        exact
        path={notFound}
        component={asyncComponent(() => import('./containers/Page/404'))}
      />
      <Route
        exact
        path={serverError}
        component={asyncComponent(() => import('./containers/Page/500'))}
      />
      <Route
        exact
        path={signin}
        component={asyncComponent(() => import('./containers/Page/signin'))}
      />
      <Route
        exact
        path={forgotpassword}
        component={asyncComponent(() => import('./containers/Page/forgotPassword'))}
      />
      <Route
        exact
        path={resetpassword}
        component={asyncComponent(() => import('./containers/Page/resetPassword'))}
      />
      <RestrictedRoute
        path={home}
        component={App}
        isLoggedIn={isLoggedIn}
      />
    </Switch>
  </ConnectedRouter>
);

export default connect(state => ({
  isLoggedIn: state.Auth.idToken !== null,
}))(PublicRoutes);
