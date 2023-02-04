import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const ReportCreateWrapper = styled.div`

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
      max-width: 568px;
    }
    &__right {
      flex: 1;
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      max-width: 568px;
    }
    .form {
      display: flex;
      flex-direction: row;

      @media only screen and (max-width: 1465px) {
        flex-direction: column;
      }
      &__firstname {
      margin-top: 14px;
      width: 80%;
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
        max-width: 255px;
        padding: 0 5px;
        border-radius: 5px;
      }
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
        align-items: center;
        margin-top: 16px;
        margin-right: 20px;
        width: 140px;
        height: 40px;
        border-radius: 4px;
        background-color: ${COLORS.grayAlto};
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: ${COLORS.black};
        outline: none;
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
      }
      &__save {
        max-width: 568px;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 50px;
        &-button {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 16px;
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
    }
    .course-fields {
      margin-top: 25px;

      &__topic {
        @media only screen and (max-width: 1465px) {
          margin-left: 4px;
        }
        margin-left: 15px;
        font-size: 12px;
        line-height: 16px;
        color: ${COLORS.black};
        &-search {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 8px;
          margin-left: 28px;
          @media only screen and (max-width: 1465px) {
            margin-left: 18px;
          }
          &-input {
            width: 100%;
            appearance: none;
            border: none;
            outline: none;
            font-size: 16px;
            line-height: 27px;
            color: ${COLORS.greyInput};
            &_search {
              margin-left: 18px;
            }
            &_error {
              border: 1px solid ${COLORS.redFlamingo};
            }
          }
        }
      }
      &__label {
        font-size: 12px;
        line-height: 16px;
        color: ${COLORS.black};
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
      &__list-item {
        margin-top: 8px;
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
        &-topic {
          display: flex;
          flex-direction: column;
          margin: 5px 16px;
          color: ${COLORS.black};
          height: 40px;
          &_active {
            background-color: ${COLORS.greyBack};
          }
        }
        &-label {
          height: 20px;
        }
      }
    }
  }
  .topic {
    display: flex;
    flex-direction: row;
    margin-right: 16px;

    @media only screen and (max-width: 1465px) {
      display: flex;
      flex-direction: column;
    }

    &__left {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-right: 4px;
      max-width: 568px;
    }
    &__right {
      display: flex;
      flex-direction: column;
      flex: 1;
      max-width: 568px;
    }
    &__attached {
      margin: 25px 0 0 28px;
      font-size: 12px;
      line-height: 16px;
      color: ${COLORS.black};
      @media only screen and (max-width: 1465px) {
        margin-left: 0;
      }
    }
  }
`;

export default WithDirection(ReportCreateWrapper);
