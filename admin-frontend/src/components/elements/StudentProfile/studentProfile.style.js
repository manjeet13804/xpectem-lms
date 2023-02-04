import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const StudentProfileWrapper = styled.div`
  margin-top: 1px;
  .student-profile {
    
    &__students-count {
      margin-left: 5px;
    }
    
    &__firstname {
      margin-left: 5px;
      &:before {
        content: '- ';
      }
    }
    
    &__lastname {
      margin-left: 5px;
    }

    &__delete-btn {
      margin-right: 10px;
    }

    &__block {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      height: 36px;
      cursor: pointer;
      background-color: ${COLORS.grayWild};

      &_is-error {
        border: 1px solid red;
      }
      
      &-text {
        margin-left: 6px;
        display: flex;
        flex-direction: row;
      }
      
      &-icon {
        margin-right: 6px;
        &-right {
          transform: rotate(90deg);
        }
        
        &-down {
          transform: rotate(-180deg);
        }
      }
      
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
      margin-top: 10px;
      &-title {
        font-weight: normal;
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.black};
        margin-top: 15px;
      }
    }
    
    &__checkbox-group {
      display: flex;
      flex-direction: column;
      margin-top: 19px;
    }
    
    &__taxonomy {
      color: ${COLORS.black};
      &-title {
        font-weight: 500;
        font-size: 20px;
        line-height: 23px;
        letter-spacing: 0.15px;
        margin-top: 20px;
        &-input {
          font-weight: normal;
          font-size: 12px;
          line-height: 16px;
          margin-top: 15px;
          letter-spacing: 0.4px;
        }
      }
      
      &-input {
        width: 100%;
        font-size: 16px;
        line-height: 28px;
        outline: none;
        border: none;
        margin-top: 14px;
        margin-left: 16px;
        max-width: 255px;
        padding: 0 5px;
        border-radius: 5px;
      }
    }
  }
`;

export default WithDirection(StudentProfileWrapper);
