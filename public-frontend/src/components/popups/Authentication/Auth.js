// @flow
import React from 'react';

import {SignupForm, SigninForm} from 'components';
import {login, registration} from './constants';

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

  return (
    <React.Fragment>
      {activePage === registration
        && <SignupForm close={close} history={history} />}
      {activePage === login && (
        <SigninForm
          close={close}
          switchForgottenPassword={switchForgotPassword}
          switchRegistration={switchRegistration}
          history={history}
        />
      )}
    </React.Fragment>
  );
};


export default AuthForms;
