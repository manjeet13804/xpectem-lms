// @flow
import React from 'react';

import { LoginForm } from 'components';
import { login } from './constants';

type PropType = {
  close: () => void,
  history: object,
  activePage: string,
  switchRegistration: () => void,
  switchForgotPassword: () => void
};


const AuthForms = (props: PropType): Node => {
  const {
    activePage,
    switchRegistration,
    switchForgotPassword,
    close,
    history,
  } = props;

  return activePage === login && (
  <LoginForm
    close={close}
    switchForgottenPassword={switchForgotPassword}
    switchRegistration={switchRegistration}
    history={history}
  />
  );
};


export default AuthForms;
