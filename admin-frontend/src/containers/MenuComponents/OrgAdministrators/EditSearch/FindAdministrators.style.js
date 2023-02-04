import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const AdministratorsFindWrapper = styled.div`
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
  
  .group-search {
  
    &__form {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      
      @media only screen and (max-width: 767px) {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
     }
     
     &-checkbox {
      @media only screen and (max-width: 767px) {
        margin-top: 16px;
      }
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
    &__button {
      display: flex;
      justify-content: flex-end;
      margin-top: 40px;
      &-search {
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
  .admin-search {
    &__firstname {
      margin-top: 60px;
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
    &__email {
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
    &__telephone {
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
    &__button {
      display: flex;
      justify-content: flex-end;
      margin-top: 40px;
      &-search {
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
  .admin-find {
    &__title {
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      color: ${COLORS.black};
      margin-top: 44px;
      margin-bottom: 30px;
    }
  }
`;

export default WithDirection(AdministratorsFindWrapper);
