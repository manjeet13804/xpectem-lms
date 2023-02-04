import styled from 'styled-components';
import { palette } from 'styled-theme';
import WithDirection from 'settings/withDirection';

const SignInStyleWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  
  .authErrorText {
    font-size: 14px;
    color: #f5222d;
  }

  .isoLoginContent {
    width: 632px;
    align-items: center;
    margin: 5% auto 0;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    padding: 70px 50px;
    background-color: #ffffff;

    @media only screen and (max-width: 767px) {
      width: 100%;
      padding: 70px 20px;
    }
    .isoLogoWrapper {
      width: 309px;
      display: flex;
      margin-bottom: 50px;
      justify-content: center;
      flex-shrink: 0;
      
      .xpectumLogo {
        width: 309px;
        height: 65px;
      }

      a {
        font-size: 24px;
        font-weight: 300;
        line-height: 1;
        text-transform: uppercase;
        color: ${palette('secondary', 2)};
      }
    }
    .line {
      width: 100%;
      border:0.5px solid  #e5e5e5;
    }
    .isoLeftRightComponent {
      display: flex;
      justify-content: flex-end;
    }

    .isoSignInForm {
      width: 309px;
      display: flex;
      flex-shrink: 0;
      flex-direction: column;
      margin-top: 64px;

      .isoInputWrapper {
        margin-bottom: 5px;
        
      .isoInput {
        border: none;
        margin-top: 17px;
      }

        &:last-of-type {
          margin-bottom: 0;
        }
        
        input {
        border: none;
        margin-top: 17px;
          &::-webkit-input-placeholder {
            color: ${palette('grayscale', 0)};
          }

          &:-moz-placeholder {
            color: ${palette('grayscale', 0)};
          }

          &::-moz-placeholder {
            color: ${palette('grayscale', 0)};
          }
          &:-ms-input-placeholder {
            color: ${palette('grayscale', 0)};
          }
        }
      }

      .isoRememberForgotten {
        margin-top: 31px;
        .isoCheckbox {
          margin-right: 7px;
        }
        .isoForgotten {
          margin-top: 20px;
          margin-bottom: 43px;
          cursor: pointer;
        }
      }

      .isoHelperText {
        font-size: 12px;
        font-weight: 400;
        line-height: 1.2;
        color: ${palette('grayscale', 1)};
        padding-left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '13px')};
        padding-right: ${props => (props['data-rtl'] === 'rtl' ? '13px' : 'inherit')};
        margin: 15px 0;
        position: relative;
        display: flex;
        align-items: center;

        &:before {
          content: '*';
          color: ${palette('error', 0)};
          padding-right: 3px;
          font-size: 14px;
          line-height: 1;
          position: absolute;
          top: 2px;
          left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
          right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
        }
      }

      .isoHelperWrapper {
        margin-top: 35px;
        flex-direction: column;
      }

      .isoOtherLogin {
        padding-top: 40px;
        margin-top: 35px;
        border-top: 1px dashed ${palette('grayscale', 2)};

        > a {
          display: flex;
          margin-bottom: 10px;

          &:last-child {
            margin-bottom: 0;
          }
        }

        button {
          width: 100%;
          height: 42px;
          border: 0;
          font-weight: 500;

          &.btnFacebook {
            background-color: #3b5998;

            &:hover {
              background-color: darken(#3b5998, 5%);
            }
          }

          &.btnGooglePlus {
            background-color: #dd4b39;
            margin-top: 15px;

            &:hover {
              background-color: darken(#dd4b39, 5%);
            }
          }

          &.btnAuthZero {
            background-color: #e14615;
            margin-top: 15px;

            &:hover {
              background-color: darken(#e14615, 5%);
            }
          }
        }
      }

      .isoForgotPass {
        font-size: 12px;
        color: ${palette('text', 3)};
        margin-bottom: 10px;
        text-decoration: none;

        &:hover {
          color: ${palette('primary', 0)};
        }
      }

      button {
        font-weight: 500;
      }
    }
  }
`;

export default WithDirection(SignInStyleWrapper);
