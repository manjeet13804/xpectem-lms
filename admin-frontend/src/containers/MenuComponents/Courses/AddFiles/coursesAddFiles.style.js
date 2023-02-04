import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const CoursesCreateWrapper = styled.div`
  .files-page {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-right: 16px;
    @media only screen and (max-width: 1465px) {
      display: flex;
      flex-direction: column;
      margin-left: 16px;
    }
    
    &__left {
      flex: 1;
      margin-right: 40px;
    }
    &__right {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .form {
      display: flex;
      flex-direction: row;
      @media only screen and (max-width: 1465px) {
        flex-direction: column;
      }
      &__title {
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.black};
        margin-left: 15px;
      }
      &__button {
        display: flex;
        justify-content: center;
        margin: 100px 20px;
        width: 140px;
        height: 40px;
        border-radius: 4px;
        background-color: ${COLORS.grayAlto};
        font-weight: 500;
        font-size: 14px;
        line-height: 40px;
        color: ${COLORS.black};
        outline: none;
        cursor: pointer;
        &_disabled {
          background-color: ${COLORS.greyBack};
          border: none;
          color: ${COLORS.grayBoulder};
        }
      }
      &__submit {
        display: flex;
        justify-content: center;
        margin-bottom: 100px;
        margin-top: 10px;
      }
    }
    .course-fields {
      margin-top: 25px;

      &__input-error {
        margin-top: 5px;
        color: red;
        font-size: 12px;
      }

      &_align-right {
        display: flex;
        justify-content: flex-end;
        
        button {
          margin: 0;
        }
      }
      &__label {
        font-size: 12px;
        line-height: 16px;
        color: ${COLORS.black};
        &_blue {
          color: ${COLORS.blueHeader};
        }
      }
      &__input {
        width: 100%;
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.greyInput};
        outline: none;
        border: none;
        margin-top: 14px;
        margin-left: 16px;
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
      &__switch {
        margin-top: 20px;
        display: flex;
        &-label {
          color: ${COLORS.greyInput};
          margin-left: 10px;
        }
      }
      &__search {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 8px;
        margin-left: 14px;
        border: 1px solid ${COLORS.inputPlaceholder};
        padding: 0 5px;
        border-radius: 5px;
        &-input {
          width: 100%;
          appearance: none;
          border: none;
          outline: none;
          font-size: 16px;
          line-height: 27px;
          color: ${COLORS.greyInput};
        }
      }
      &__search-block {
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        border: 1px solid ${COLORS.greyInput};
        border-radius: 4px;
        background: ${COLORS.white};
        overflow: auto;
        z-index: 11;
        max-height: 120px;
        width: 100%;
        
        &-item {
          margin: 5px 16px;
          font-size: 15px;
          line-height: 28px;
          color: ${COLORS.black};
          height: 30px;
          cursor: pointer;
          
          &_active {
            background-color: ${COLORS.greyBack};
          }
        }
      }
      &__attached-file {
        margin-top: 10px;
      }
    }
  }

  .page {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-right: 16px;
     @media only screen and (max-width: 1465px) {
       display: flex;
       flex-direction: column;
       margin-left: 16px;
     }
    
    &__left {
      flex: 1;
      margin-right: 40px;
    }
    &__right {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .form {
      display: flex;
      flex-direction: row;
      @media only screen and (max-width: 1465px) {
        flex-direction: column;
      }
      &__title {
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.black};
        margin-left: 15px;
      }
      &__button {
        display: flex;
        justify-content: center;
        margin: 100px 20px;
        width: 140px;
        height: 40px;
        border-radius: 4px;
        background-color: ${COLORS.grayAlto};
        font-weight: 500;
        font-size: 14px;
        line-height: 40px;
        color: ${COLORS.black};
        outline: none;
        cursor: pointer;
        &_disabled {
          background-color: ${COLORS.greyBack};
          border: none;
          color: ${COLORS.grayBoulder};
        }
      }
      &__submit {
        display: flex;
        justify-content: center;
        margin-bottom: 100px;
        margin-top: 24px;
        
        &-button {
          margin-right: 24px;
        }
      }
    }
    .course-fields {
      margin-top: 25px;

      &__input-error {
        margin-top: 5px;
        color: red;
        font-size: 12px;
      }

      &_align-right {
        display: flex;
        justify-content: flex-end;
        
        button {
          margin: 0;
        }
      }
      &__label {
        font-size: 12px;
        line-height: 16px;
        color: ${COLORS.black};
        &_blue {
          color: ${COLORS.blueHeader};
        }
      }
      &__input {
        width: 100%;
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.greyInput};
        outline: none;
        border: none;
        margin-top: 14px;
        margin-left: 16px;
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
      &__switch {
        margin-top: 20px;
        display: flex;
        &-label {
          color: ${COLORS.greyInput};
          margin-left: 10px;
        }
      }
      &__search {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 8px;
        margin-left: 14px;
        &-input {
          width: 100%;
          appearance: none;
          border: none;
          outline: none;
          margin-left: 18px;
          font-size: 16px;
          line-height: 27px;
          color: ${COLORS.greyInput};
        }
      }
      &__search-block {
        margin-top: 15px;
        display: flex;
        flex-direction: column;
        border: 1px solid ${COLORS.greyInput};
        border-radius: 4px;
        background: ${COLORS.white};
        overflow: auto;
        z-index: 11;
        max-height: 120px;
        width: 100%;
        
        &-item {
          margin: 5px 16px;
          font-size: 15px;
          line-height: 28px;
          color: ${COLORS.black};
          height: 30px;
          cursor: pointer;
          
          &_active {
            background-color: ${COLORS.greyBack};
          }
        }
      }
      &__attached-file {
        margin-top: 10px;
      }
    }
  }
`;

export default WithDirection(CoursesCreateWrapper);
