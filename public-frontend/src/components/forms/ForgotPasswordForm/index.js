// @flow
import React, {Component} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import InputField from 'components/shared/InputField';
import {getRequestLoading} from 'redux/selectors';
import block from 'utils/bem';
import {TERM_SHARED, AUTH_DICTIONARY} from 'localise';
import {actionRequest, actionRequestDefault} from 'redux/actions';
import {RESTORE_PASSWORD as url} from 'constants/apiUrls';
import {RequestValueType, AsyncRequestType} from 'redux/actionTypes';
import LogoXpectum from 'assets/images/xpectum_logo_big.png';
import {email} from '../validate';
import '../form.scss';

const DefaultProps = {
  sendData: () => {},
  isLoading: false,
};

type PropType = {
  sendData?: (value: RequestValueType) => AsyncRequestType,
  isLoading?: boolean
};

const bem = block('auth-form');

const FogottenPasswordSchema = Yup.object().shape({
  email,
});


class ForgotPasswordForm extends Component<PropType> {
    onAuth = (values: object, { setSubmitting }: object) => {
      const {sendData} = this.props;
      setSubmitting(false);
      sendData({
        method: 'POST',
        url,
        body: values,
      });
    };

    render(): Node {
      const {isLoading} = this.props;
      return (
        <Formik
          initialValues={{email: ''}}
          validationSchema={FogottenPasswordSchema}
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
                <InputField
                  title={TERM_SHARED.emailRestore}
                  id="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={errors.email && touched.email}
                  errorMessage={errors.email}
                  placeholder={AUTH_DICTIONARY.placeholderUsernameForRestore}
                  type="text"
                  required
                />
              </section>
              <section className={bem('buttons')}>
                <button
                  type="submit"
                  className={`${bem('submit')} btn-auth`}
                  disabled={isSubmitting || !isValid || isLoading}
                >
                  {AUTH_DICTIONARY.sendButton}
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
});

ForgotPasswordForm.defaultProps = DefaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);
