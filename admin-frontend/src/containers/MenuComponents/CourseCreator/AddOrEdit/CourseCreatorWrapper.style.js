import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const CourseCreatorWrapper = styled.div`
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
    
    &__courses-word {
      font-size: 20px;
      color: ${COLORS.black};
      margin: 5px 0;
    }
    
    &__button {
      display: flex;
      justify-content: flex-start;
      margin-top: 16px;
    
      &-generate {
        height: 40px;
        border-radius: 4px;
        background-color: ${COLORS.grayAlto};
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: ${COLORS.black};
        outline: none;
        cursor: pointer;
        margin-bottom: 10px;
      }
    } 
    
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
      cursor: pointer;
      
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
        color: ${COLORS.greyInput};
        outline: none;
        border: none;
        margin-top: 14px;
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
      width: 140px;
      min-height: 40px;
      border-radius: 4px;
      border: 1px solid gray;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: ${COLORS.black};
      outline: none;
      cursor: pointer;
      
      &:disabled {
        color: gray;
      }
    }
    
    &__loader {
      margin-right: 10px !important;
    }
    
    &__delete {
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
      border: 1px solid gray;
      
      &:disabled {
        opacity: 0.5;
      }
    }
  }
`;

export default WithDirection(CourseCreatorWrapper);
