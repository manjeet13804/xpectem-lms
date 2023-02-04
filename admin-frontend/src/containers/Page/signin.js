import React, { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { MiniFooter } from 'components';
import Button from 'components/uielements/button';
import authAction from 'redux/auth/actions';
import IntlMessages from 'components/utility/intlMessages';
import Form from 'components/uielements/form';
import { RenderInput } from 'components/formElements';
import logoImg from 'assets/images/xpectum.png';
import { MAIN_ROUTE } from 'constants/routes';
import SignInStyleWrapper from './signin.style';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRemember: false,
    };
  }

  onChange = (event) => {
    const { form, setAuthValue } = this.props;
    const { value, name } = event.target;
    const { setFieldsValue } = form;
    setFieldsValue({ [name]: value });
    setAuthValue({ [name]: value });
  };

  handleLogin = () => {
    const {
      login,
      email,
      password,
    } = this.props;

    login({ email, password });
  };

  handleCheckbox = () => {
    this.setState(prevState => ({
      isRemember: !prevState.isRemember,
    }));
  };

  render() {
    const from = { pathname: MAIN_ROUTE.start };
    const { isRemeber } = this.state;
    const { form: { getFieldDecorator }, isLoggedIn, error } = this.props;
    const editProps = {
      getFieldDecorator,
      onChange: this.onChange,
      onlyPlaceholder: true,
      onPressEnter: this.handleLogin,
    };

    if (isLoggedIn) {
      return <Redirect to={from} />;
    }

    return (
      <Fragment>
        <SignInStyleWrapper>
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to={MAIN_ROUTE.start}>
                <img className="xpectumLogo" src={logoImg} alt="#" />
              </Link>
            </div>
            <hr className="line" />
            <Form className="isoSignInForm">
              <IntlMessages id="page.signInUsername" />
              <div className="isoInputWrapper">
                <RenderInput className="isoInput" title="Use your e-mail address" itemName="email" size="large" type="email" {...editProps} />
              </div>

              <div className="isoInputWrapper">
                <IntlMessages id="page.signInPassword" />
                <RenderInput className="isoInput" title="********" itemName="password" size="large" isPass {...editProps} />
                { error && <p className="authErrorText">{error}</p> }
              </div>
              <div className="isoRememberForgotten">
                <div className="isoRemember">
                  <input
                    className="isoCheckbox"
                    type="checkbox"
                    onChange={() => this.handleCheckbox()}
                    checked={isRemeber}
                  />
                  <IntlMessages id="page.signInRememberMe" />
                </div>
                <Link className="isoForgotten" to={MAIN_ROUTE.forgotpassword}>
                  <IntlMessages id="page.signInForgotten" />
                </Link>
              </div>
              <div className="isoInputWrapper isoLeftRightComponent">
                <Button type="primary" onClick={this.handleLogin}>
                  <IntlMessages id="page.signInButton" />
                </Button>
              </div>
            </Form>
          </div>
        </SignInStyleWrapper>
        <MiniFooter />
      </Fragment>
    );
  }
}

const mapStateToProps = ({
  Auth: {
    idToken,
    email,
    password,
    error,
  },
}) => ({
  isLoggedIn: idToken !== null,
  email,
  password,
  error,
});

const WrappedUserForm = Form.create()(SignIn);
export default connect(mapStateToProps, authAction)(WrappedUserForm);
