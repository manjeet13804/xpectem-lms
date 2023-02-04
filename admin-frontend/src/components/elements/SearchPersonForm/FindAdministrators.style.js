import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const AdministratorsFindWrapper = styled.div`
  .admin-search {
    padding-right: 20px;
  
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
        height: 30px;
        color: ${COLORS.greyInput};
        outline: none;
        border: 1px solid ${COLORS.inputPlaceholder};
        border-radius: 5px;
        margin-top: 14px;
        padding: 0 5px;
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
        height: 30px;
        color: ${COLORS.greyInput};
        outline: none;
        border: 1px solid ${COLORS.inputPlaceholder};
        border-radius: 5px;
        margin-top: 14px;
        padding: 0 5px;
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
        height: 30px;
        color: ${COLORS.greyInput};
        outline: none;
        border: 1px solid ${COLORS.inputPlaceholder};
        border-radius: 5px;
        margin-top: 14px;
        padding: 0 5px;
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
        height: 30px;
        color: ${COLORS.greyInput};
        outline: none;
        border: 1px solid ${COLORS.inputPlaceholder};
        border-radius: 5px;
        margin-top: 14px;
        padding: 0 5px;
      }
    }
    &__button {
      display: flex;
      justify-content: flex-end;
      margin-top: 40px;
      &-search {
        border: 0;
        height: 40px;
        min-width: 140px;
        width: auto;
        font-weight: bold;
        background-color: #D4D4D4;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 20px;
        
        &:focus {
          outline: none;
        }
        
        &:disabled {
          opacity: 0.5;
          cursor: unset;
        }
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
