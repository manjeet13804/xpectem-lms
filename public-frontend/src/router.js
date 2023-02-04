// @flow
import React, { Component, Node } from 'react';
import {
  Route, Redirect, withRouter, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';

import { getUserRoles, isAppCanRender } from 'redux/selectors';
import {
  AuthenticationPage,
  HomePage,
  OrganisationsSwitchPage,
  EditProfilePage,
  StudentCommunicationPage,
  AddEmailPage,
  NotFoundPage,
  RegLinkPage,
} from 'pages';

import { PATHS } from 'constants/paths';
import { USER_ROLES_ENUM } from 'constants/enums';
import ROUTES from 'constants/routesPathes';

const DefaultProps = {
  role: USER_ROLES_ENUM.none,
};

type PropsType = {
  role?: string,
  isRender: boolean
};

type PropPrivateType = {
  component: Node,
  role: string
};

const PrivateRoute = (
  {
    component: TagComponent,
    role,
    ...rest
  }: PropPrivateType,
): mixed => (
  <Route
    {...rest}
    render={(): mixed => (
      (role !== USER_ROLES_ENUM.none) // TODO fn for checked roles render pages
        ? <TagComponent />
        : (
          <Redirect
            to={{
              pathname: PATHS.signin,
            }}
          />
        )
    )
      }
  />
);

class PublicRoutes extends Component <PropsType> {
  renderRoutes(): Node {
    const { role } = this.props;
    return (
      <Switch>
        <Route
          exact
          path={PATHS.signin}
          component={AuthenticationPage}
        />
        <Route
          exact
          path={PATHS.home}
          component={HomePage}
        />
        <Route
          exact
          path={PATHS.studentCommunication}
          component={StudentCommunicationPage}
        />
        <Route
          exact
          path={PATHS.profile}
          component={EditProfilePage}
        />
        <Route
          exact
          path={PATHS.organisationsSwitch}
          component={OrganisationsSwitchPage}
        />
        <Route
          exact
          path={PATHS.email}
          component={AddEmailPage}
        />
        <Route
          exact
          path={PATHS.regLink}
          component={RegLinkPage}
        />
        {
          ROUTES.map((item: PropPrivateType): Route => (
            <PrivateRoute
              exact
              key={item.path}
              path={item.path}
              component={item.component}
              role={role}
            />
          ))
        }
        <Route component={NotFoundPage} />
      </Switch>
    );
  }

  render(): Node {
    const { isRender } = this.props;
    return isRender ? this.renderRoutes() : null;
  }
}

PublicRoutes.defaultProps = DefaultProps;

const stateProps = (state: object): object => ({
  role: getUserRoles(state),
  isRender: isAppCanRender(state),
});

export default withRouter(
  connect(stateProps)(PublicRoutes),
);
