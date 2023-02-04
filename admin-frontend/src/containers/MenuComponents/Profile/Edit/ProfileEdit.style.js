import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const ProfileEditWrapper = styled.div`
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
      justify-content: space-between;
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
      background-color: ${COLORS.redPomegranate};
      color: ${COLORS.white};
      border: 0;
      height: 40px;
      min-width: 140px;
      width: auto;
      font-weight: bold;
      border-radius: 4px;
      margin-right: 10px;
    }
    &-save {
      border: 0;
      height: 40px;
      min-width: 140px;
      width: auto;
      font-weight: bold;
      background-color: ${COLORS.defaultButtonColor};
      border-radius: 4px;
    }
  }
  &__link {
    outline: none;
  }
  }
`;

export default WithDirection(ProfileEditWrapper);
