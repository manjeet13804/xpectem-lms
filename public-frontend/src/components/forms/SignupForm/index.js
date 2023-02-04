// @flow
import React, {Component} from 'react';

import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {Checkbox, InputField} from 'components';
import {AUTH_DICTIONARY, TERM_SHARED, ERRORS} from 'localise';
import block from 'utils/bem';
import {sharedClass} from 'utils/className';
import {getRequestLoading, getRequestError} from 'redux/selectors';
import {actionRequest, actionRequestDefault} from 'redux/actions';
import {SIGN_UP as url} from 'constants/apiUrls';
import {RegistrationType} from 'models';
import {
  password as passwordValidate,
  email as emailValidate,
  firstName as firstNameValidate,
  lastName as lastNameValidate,
} from '../validate';

type PropType = {
    sendData: (body: RegistrationType, url: string, method: string) => void,
    close: () => void,
    isLoading: boolean
};

const SignupSchema = Yup.object().shape({
  password: passwordValidate,
  email: emailValidate,
  firstName: firstNameValidate,
  lastName: lastNameValidate,
  repeatPassword: passwordValidate,
});


const bem = block('auth-form');
const btn = block('btn');

const btnSubmit = sharedClass(bem('submit'), 'btn');
const btnCancel = sharedClass(btn({cancel: true}), bem('btn-cancel'));

class SignupForm extends Component<PropType> {
  constructor(props: PropType) {
    super(props);

    this.state = {
      acceptTerms: false,
    };
  }

    onAuth = (values: object, { setSubmitting }: object) => {
      const {sendData} = this.props;
      setSubmitting(false);
      const {
        firstName,
        lastName,
        email,
        password,
      } = values;
      sendData({
        body: {
          firstName,
          lastName,
          email,
          password,
        },
        url,
        method: 'POST',
      });
    };

  handleCheckbox = () => {
    this.setState((prevState: object): void => ({
      acceptTerms: !prevState.acceptTerms,
    }));
  };

  render(): Node {
    const {close, isLoading} = this.props;
    const {acceptTerms} = this.state;
    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          repeatPassword: '',
        }}
        validationSchema={SignupSchema}
        validate={(values: object): object => (
          values.repeatPassword !== values.password
            ? { repeatPassword: ERRORS.passwordsDoNotMatch}
            : {}
        )}
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
              <InputField
                title={TERM_SHARED.email}
                id="email"
                value={values.email}
                placeholder="name@domain.se"
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.email && touched.email}
                errorMessage={errors.email}
                className={bem('input-field')}
                required
              />
              <InputField
                title={TERM_SHARED.firstName}
                id="firstName"
                value={values.firstName}
                placeholder={AUTH_DICTIONARY.placeholderFirstName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.firstName && touched.firstName}
                errorMessage={errors.firstName}
                className={bem('input-field')}
                required
              />
              <InputField
                title={TERM_SHARED.lastName}
                id="lastName"
                value={values.lastName}
                placeholder={AUTH_DICTIONARY.placeholderLastName}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.lastName && touched.lastName}
                errorMessage={errors.lastName}
                className={bem('input-field')}
                required
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
                placeholder={AUTH_DICTIONARY.placeholderPassword}
                className={bem('input-field')}
                required
              />

              <InputField
                title={AUTH_DICTIONARY.repeatPassword}
                id="repeatPassword"
                value={values.repeatPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.repeatPassword && touched.repeatPassword}
                errorMessage={errors.repeatPassword}
                type="password"
                placeholder={AUTH_DICTIONARY.placeholderPassword}
                className={bem('input-field')}
                required
              />
              <div className={bem('context')}>
                <Checkbox
                  handleChange={this.handleCheckbox}
                  checked={acceptTerms}
                  bem={bem}
                  text={AUTH_DICTIONARY.acceptedTerms}
                />
              </div>
              <p className={bem('small-text')}>{AUTH_DICTIONARY.termsAndConditions}</p>
            </section>
            <hr className="line" />
            <section className={bem('buttons')}>
              <button type="button" className={btnCancel} onClick={close}>
                {TERM_SHARED.abort}
              </button>
              <button
                type="submit"
                className={btnSubmit}
                disabled={isSubmitting || !isValid || !acceptTerms || isLoading}
              >
                {AUTH_DICTIONARY.registerAccount}
              </button>
            </section>
          </form>
        )}
      </Formik>
    );
  }
}


const mapDispatchToProps = {
  sendData: actionRequest,
  authDefaultForm: actionRequestDefault,
};

const mapStateToProps = (state: object): object => ({
  isLoading: getRequestLoading(state),
  serverError: getRequestError(state),
});


export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
