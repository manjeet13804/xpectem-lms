// @flow
import React, {Component} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {InputField, Checkbox, WarningIcon} from 'components';
import block from 'utils/bem';
import {TERM_SHARED, AUTH_DICTIONARY, ERRORS} from 'localise';
import {sharedClass} from 'utils/className';
import {actionLoginIn, actionLoginDefault} from 'redux/actions';
import {getErrorProfile, getLoadingProfile} from 'redux/selectors';
import {LoginInType} from 'models';
import {password, email} from '../validate';

import '../form.scss';

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

const bem = block('auth-form');
const btn = block('btn');


const SigninSchema = Yup.object().shape({
  password,
  email,
});

const btnSubmit = sharedClass(bem('submit'), 'btn');
const btnCancel = sharedClass(btn({cancel: true}), bem('btn-cancel'));

class SigninForm extends Component<PropType> {
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

  showErrorServer = (): Node => (
    <div className={`${bem('error-block')} swing`}>
      {ERRORS.invalidEmailOrPassword}
      <WarningIcon />
    </div>
  );

  render(): Node {
    const {
      switchRegistration,
      close,
      isLoading,
      switchForgottenPassword,
      errorServer,
    } = this.props;

    const {isRemember} = this.state;

    return (
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={SigninSchema}
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
            <section className={bem('content')}>
              {errorServer && this.state && this.showErrorServer()}
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
              <div
                className={bem('context')}
                onClick={switchRegistration}
                role="button"
                tabIndex="0"
              >
                {AUTH_DICTIONARY.registerAccount}
              </div>
            </section>
            <hr className="line" />
            <section className={bem('buttons')}>
              <button type="button" className={btnCancel} onClick={close}>
                {TERM_SHARED.abort}
              </button>
              <button
                type="submit"
                className={btnSubmit}
                disabled={isSubmitting || !isValid || isLoading}
              >
                {TERM_SHARED.login}
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

SigninForm.defaultProps = DefaultProps;
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SigninForm),
);
