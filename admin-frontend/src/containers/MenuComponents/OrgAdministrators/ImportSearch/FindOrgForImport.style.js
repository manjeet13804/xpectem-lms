import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const FindOrgForImportWrapper = styled.div`
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
  .group {
  
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
        
        &_active {
          background-color: ${COLORS.greyBack};
        }
      }
    }
    
    &__title {
      font-size: 16px;
      line-height: 28px;
      margin-left: 16px;
      color: ${COLORS.black};
    }
    &__search-title {
      font-size: 12px;
      line-height: 16px;
      color: ${COLORS.black};
      margin-top: 16px;
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
    &__form {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 24px;
      @media only screen and (max-width: 767px) {
        display: flex;
        flex-direction: column;
      }
      &-checkbox {
        font-size: 14px;
        line-height: 20px;
        color: ${COLORS.greyInput};
        @media only screen and (max-width: 767px) {
          margin-top: 20px;
        }
      }
    }
  }
  
  .button {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
    &__search {
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
  
  .main {
    &__title {
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      margin-top: 43px;
      color: ${COLORS.black};
    }
    &__search-groups {
      margin-top: 30px;
    }
    &__button {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      &-link {
        outline: none;
      }
      &-next {
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
    &__select {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 8px;
      &-text {
        font-size: 16px;
        line-height: 28px;
      }
      &-switch {
      
      }
    }
    &__selected {
      color: ${COLORS.black};
      margin-top: 8px;
      &-title {
        font-weight: 500;
        font-size: 20px;
        line-height: 23px;
        letter-spacing: 0.15px;
      }
      &-text {
        margin-top: 6px;
        font-size: 16px;
        line-height: 28px;
      }
      &-block {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }
      &-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 20px;
        max-width: 130px;
        height: 28px;
        background-color: ${COLORS.greyBack};
        margin-left: 8px;
        outline: none;
        &-text {
          padding-left: 7px;
          font-size: 16px;
          line-height: 28px;
          max-width: 120px;
          height: 28px;
          overflow: hidden;
        }
        &-icon {
          padding-right: 4px;
          height: 24px;
          width: 24px;
        }
      }
    }
  }
`;

export default WithDirection(FindOrgForImportWrapper);
