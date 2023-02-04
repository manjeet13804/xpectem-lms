import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { MAIN_ROUTE } from 'constants/routes';
import authAction from 'redux/auth/actions';
import { Loader } from 'semantic-ui-react';
import logoImg from 'assets/images/xpectum.png';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import ForgotPasswordStyleWrapper from './forgotPassword.style';

const ForgotPassword = (props) => {
  const {
    sendResetMail,
    changeValue,
    email,
    error,
    isLoading,
    isResetEmailSend,
    clearResetMail,
    history,
  } = props;

  useEffect(() => () => clearResetMail(), []);

  const handleChange = ({ target: { value, name } }) => {
    changeValue({ [name]: value });
  };

  const handleSend = () => {
    sendResetMail(email);
  };

  return (
    <ForgotPasswordStyleWrapper className="isoForgotPassPage">
      <div className="isoFormContentWrapper">
        {isResetEmailSend ? (
          <div className="isoFormContent">
            <div className="isoLogoWrapper">
              <Link to={MAIN_ROUTE.start}>
                <img className="xpectumLogo" src={logoImg} alt="#" />
              </Link>
            </div>
            <div className="isoFormHeadText">
              <h3 className="success-massage">
                <IntlMessages id="page.resetMailSuccessText" />
              </h3>
            </div>
            <div className="isoInputWrapper">
              <Button type="primary" onClick={() => history.push(MAIN_ROUTE.home)}>
                <IntlMessages id="page.backToLogin" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="isoFormContent">
            <div className="isoLogoWrapper">
              <Link to={MAIN_ROUTE.start}>
                <img className="xpectumLogo" src={logoImg} alt="#" />
              </Link>
            </div>
            <div className="isoFormHeadText">
              <h3>
                <IntlMessages id="page.forgetPassSubTitle" />
              </h3>
              <p>
                <IntlMessages id="page.forgetPassDescription" />
              </p>
            </div>
            <div className="isoForgotPassForm">
              <div className="isoInputWrapper">
                <Input size="large" placeholder="Email" name="email" value={email} onChange={handleChange} />
              </div>
              <div className="isoInputWrapper">
                <Button type="primary" onClick={handleSend}>
                  { isLoading ? <Loader active /> : <IntlMessages id="page.sendRequest" />}
                </Button>
                { error && <p className="resetErrorText">{error}</p> }
              </div>
            </div>
          </div>
        )}
      </div>
    </ForgotPasswordStyleWrapper>
  );
};

const mapStateToProps = ({
  Auth: {
    email,
    error,
    isLoading,
    isResetEmailSend,
  },
}) => ({
  email,
  isLoading,
  isResetEmailSend,
  error,
});

const mapDispatchToProps = dispatch => ({
  sendResetMail: value => dispatch(authAction.sendResetMail(value)),
  changeValue: value => dispatch(authAction.setAuthValue(value)),
  clearResetMail: () => dispatch(authAction.clearResetMail()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
