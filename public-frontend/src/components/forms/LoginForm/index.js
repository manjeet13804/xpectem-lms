// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import block from 'utils/bem';

import './login.scss';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {sharedClass} from 'utils/className';
import {
  InputField,
  Checkbox,
  WarningIcon,
} from 'components';
import {actionLoginIn, actionLoginDefault} from 'redux/actions';
import {getErrorProfile, getLoadingProfile} from 'redux/selectors';
import { TERM_SHARED, AUTH_DICTIONARY, ERRORS } from 'localise';
import LogoXpectum from 'assets/images/xpectum_logo_big.png';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { email, password } from '../validate';

const bem = block('login');

const DefaultProps = {
  errorServer: false,
};

type PropType = {
  switchRegistration: () => void,
  signData: (body: LoginInType, history: object, isRemember: boolean) => void,
  history: object,
  close: () => void,
  isLoading: boolean,
  switchForgottenPassword: () => void,
  errorServer?: boolean
};

const LoginSchema = Yup.object().shape({
  password,
  email,
});

const btnSubmit = sharedClass(bem('submit'), 'btn-auth');

const ServerError = (): Node => (
  <div className={`${bem('error-block')} swing`}>
    {ERRORS.invalidEmailOrPassword}
    <WarningIcon />
  </div>
);

class LoginForm extends Component<PropsType, StateType> {
  constructor(props: PropType) {
    super(props);
    this.state = {isRemember: false};
  }

  onAuth = (values: object, { setSubmitting }: object) => {
    const {
      signData,
      history,
    } = this.props;

    const {isRemember} = this.state;
    setSubmitting(false);

    signData(
      values,
      history,
      isRemember,
    );
  };

  handleCheckbox = () => {
    this.setState((prevState: object): void => ({
      isRemember: !prevState.isRemember,
    }));
  };

  render(): Node {
    const {
      isLoading,
      switchForgottenPassword,
      errorServer,
    } = this.props;

    const {isRemember} = this.state;
    return (
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={this.onAuth}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
        }: object): Node => (
          <form className={bem()} onSubmit={handleSubmit}>
            <img className={bem('logo')} src={LogoXpectum} alt="xpectim-logo" />
            <hr className="line" />
            <section className={bem('content')}>
              {errorServer && <ServerError />}
              <InputField
                title={TERM_SHARED.username}
                id="email"
                value={values.email}
                placeholder={AUTH_DICTIONARY.placeholderUsername}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.email && touched.email}
                errorMessage={errors.email}
                required
                className={bem('input-field')}
              />

              <InputField
                title={TERM_SHARED.password}
                id="password"
                value={values.password}
                placeholder={AUTH_DICTIONARY.starsOfPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.password && touched.password}
                errorMessage={errors.password}
                type="password"
                required
                className={bem('input-field')}
              />
              <div className={`${bem('context')}`}>
                <Checkbox
                  handleChange={this.handleCheckbox}
                  checked={isRemember}
                  bem={bem}
                  text={AUTH_DICTIONARY.rememberMe}
                />
              </div>
              <div
                className={bem('context')}
                onClick={switchForgottenPassword}
                role="button"
                tabIndex="0"
              >
                {AUTH_DICTIONARY.forgottenPassword}
              </div>
            </section>
            <section className={bem('buttons')}>
              <button
                type="submit"
                className={btnSubmit}
                disabled={isSubmitting || !isValid || isLoading}
              >
                {TERM_SHARED.signin}
              </button>
            </section>
          </form>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = (state: object): object => ({
  isLoading: getLoadingProfile(state),
  errorServer: getErrorProfile(state),
});

const mapDispatchToProps = {
  signData: actionLoginIn,
  loginDefault: actionLoginDefault,
};

LoginForm.defaultProps = DefaultProps;

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm),
);
