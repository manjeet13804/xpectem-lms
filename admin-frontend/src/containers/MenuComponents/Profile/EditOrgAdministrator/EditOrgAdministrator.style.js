import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const AdministratorsEditProfileWrapper = styled.div`
  .page {
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-right: 16px;
     @media only screen and (max-width: 767px) {
       display: flex;
       flex-direction: column; 
       margin-left: 16px;
     }
    
    &__left {
      flex: 1;
      margin-right: 4px;
    }
    &__right {
      flex: 1;
      margin-left: 4px;
      display: flex;
      flex-direction: column;
    }
  }
  .form {
    display: flex;
    flex-direction: column;
    &__title {
      font-size: 16px;
      line-height: 28px;
      color: ${COLORS.black};
      margin-left: 24px;
    }
    &__firstname {
      margin-top: 14px;
      &-title {
        font-size: 12px;
        line-height: 16px;
        color: ${COLORS.black};
      }
      &-input {
        width: 100%;
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.greyInput};
        outline: none;
        border: none;
        margin-top: 14px;
        margin-left: 16px;
      }
    }
     &__lastname {
      margin-top: 14px;
      &-title {
        font-size: 12px;
        line-height: 16px;
        color: ${COLORS.black};
      }
      &-input {
        width: 100%;
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.greyInput};
        outline: none;
        border: none;
        margin-top: 14px;
        margin-left: 16px;
      }
    }
    &__select {
      width: 100%;
      margin-top: 8px;
      &-title {
        font-size: 12px;
        line-height: 16px;
        color: ${COLORS.black};
        margin-top: 24px;
      }
    }
    &__notification {
      font-size: 12px;
      line-height: 16px;
      color: ${COLORS.black};
      margin-top: 24px;
    }
    &__checkbox-group {
      display: flex;
      flex-direction: column;
      margin-top: 19px;
    }
    &__organisations {
      display: flex;
      flex-direction: column;
      margin-top: 32px;
      color: ${COLORS.black};
      &-title {
        font-weight: 500;
        font-size: 20px;
        line-height: 23px;
      }
      &-text {
        font-size: 16px;
        line-height: 28px;
        margin-top: 10px;
      }
    }
    &__button {
      outline: none;
      margin-top: 16px;
      &-add {
        height: 40px;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
      }
    }
    &__link {
      outline: none;
      color: ${COLORS.black};
    }
  }
  .profile-image {
    &__title {
      font-size: 16px;
      line-height: 28px;
      color: ${COLORS.black};
      margin-top: 42px;
      margin-bottom: 16px;
    }
   &__button {
    display: flex;
    justify-content: flex-end;
    margin-top: 32px;
    &-delete {
      width: 140px;
      height: 40px;
      border-radius: 4px;
      background-color: ${COLORS.redPomegranate};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: ${COLORS.white};
      margin-right: 24px;
      outline: none;
    }
    &-save {
      width: 140px;
      height: 40px;
      border-radius: 4px;
      background-color: ${COLORS.grayAlto};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: ${COLORS.black};
      outline: none;
    }
  }
  &__link {
    outline: none;
  }
  }
`;

export default WithDirection(AdministratorsEditProfileWrapper);

