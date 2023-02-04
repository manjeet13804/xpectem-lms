import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const AdministratorsFindGroupsWrapper = styled.div`
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
  .main__title {
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    margin-top: 43px;
    color: ${COLORS.black};
  }
  .main__search-groups {
    margin-top: 30px;
  }
`;

export default WithDirection(AdministratorsFindGroupsWrapper);
