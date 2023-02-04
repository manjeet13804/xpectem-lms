import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const AdministratorsAddWrapper = styled.div`
  .page {
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-right: 16px;
    &_transparent {
      opacity: 0.3;
      pointer-events: none;
    }
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
    
    &__button-add {
      width: 140px;
      height: 40px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: ${COLORS.black};
      outline: none;
      border: 1px solid gray;
      
      &:disabled {
        color: gray;
      }
    }
    
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
        outline: none;
        margin-top: 14px;
        padding: 0 5px;
        border-radius: 5px;
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
        margin-top: 14px;
        padding: 0 5px;
        border-radius: 5px;
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
      display: flex;
      justify-content: flex-start;
      margin-top: 16px;
    }
  }
  .profile-image {
    height: 100%;

    &__title {
      font-size: 16px;
      line-height: 28px;
      color: ${COLORS.black};
      margin-top: 42px;
      margin-bottom: 16px;
    }
  }

  .button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 32px;
    &__add {
      border: 0;
      height: 40px;
      min-width: 140px;
      width: auto;
      font-weight: bold;
      background-color: ${COLORS.defaultButtonColor};
      border-radius: 4px;
      cursor: pointer;
      
      &:disabled {
        color: gray;
      }
    }
    
    &__loader {
      margin-right: 10px !important;
    }
    
    &__delete {
      background-color: ${COLORS.redPomegranate};
      color: ${COLORS.white};
      margin-right: 24px;
      border: 0;
      height: 40px;
      min-width: 140px;
      width: auto;
      font-weight: bold;
      border-radius: 4px;
      
      &:disabled {
        opacity: 0.5;
      }
    }
  }
`;

export default WithDirection(AdministratorsAddWrapper);
