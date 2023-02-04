// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AUTH_DICTIONARY } from 'localise';
import {
  ForgotPasswordForm,
  Message,
  SimpleLayout,
} from 'components';
import { getRequestStatus } from 'redux/selectors';
import { actionLoginDefault, actionRequestDefault } from 'redux/actions';
import AuthForms from './Auth';
import { login, registration, forgotPassword } from './constants';

const DefaultProps = {
  history: {},
  statusRequest: false,
  authDefaultForm: () => {},
  requestDefault: () => {},
};

type PropsType = {
  close: () => void,
  history?: object,
  authDefaultForm?: () => void,
  statusRequest?: boolean,
  requestDefault?: () => void
};

class AuthenticationPage extends Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      currentPanel: login,
    };
    const {authDefaultForm, requestDefault} = this.props;
    authDefaultForm();
    requestDefault();
  }

  switchRegistration = () => {
    this.setState({currentPanel: registration});
    const {requestDefault} = this.props;
    requestDefault();
  };

  switchLogOn = () => {
    this.setState({currentPanel: login});
    const {authDefaultForm} = this.props;
    authDefaultForm();
  };

  switchForgottenPassword = () => {
    this.setState({currentPanel: forgotPassword});
    const {authDefaultForm} = this.props;
    authDefaultForm();
  };

  render(): Node {
    const {history, close, statusRequest} = this.props;
    const {currentPanel} = this.state;

    if (statusRequest) {
      return (
        <Message message={AUTH_DICTIONARY.messageSendToEmail} />
      );
    }

    return (
      <SimpleLayout>
        {currentPanel === forgotPassword
          ? <ForgotPasswordForm close={close} history={history} />
          : (
            <AuthForms
              close={close}
              history={history}
              activePage={currentPanel}
              switchRegistration={this.switchRegistration}
              switchForgotPassword={this.switchForgottenPassword}
            />
          )
        }
      </SimpleLayout>
    );
  }
}

AuthenticationPage.defaultProps = DefaultProps;

const mapStateToProps = (state: object): object => ({
  statusRequest: getRequestStatus(state),
});

const mapDispatchToProps = {
  authDefaultForm: actionLoginDefault,
  requestDefault: actionRequestDefault,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationPage);
