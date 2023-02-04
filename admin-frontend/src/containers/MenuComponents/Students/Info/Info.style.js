import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const StudentsAddWrapper = styled.div`
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

  .title {
    display: flex;
    flex-direction: column;
    @media only screen and (max-width: 767px) {
      margin-left: 16px;
    }
    &__item {
      font-weight: normal;
      font-size: 16px;
      line-height: 28px;
      color: ${COLORS.black};
      margin-bottom: 15px;
    }
    &__lms-group {
      margin: 0 2px;
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

    &__courses-info {
      font-size: 12px;
      line-height: 16px;
      color: ${COLORS.black};
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
        color: ${COLORS.greyInput};
        outline: none;
        border: none;
        margin-top: 14px;
        margin-left: 16px;
        max-width: 250px;
      }
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
      }
    } 
  }
  
  .profile {
  
    &__delete-attend {
      font-size: 25px;
    }

    &__button {
      display: flex;
      justify-content: flex-end;
      margin-top: 32px;

      &_isCentered {
        justify-content: center;
      }
    
      &-delete {
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
      }
      
      &-save {
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
  
    &__link {
      outline: none;
    }
  }
  
  .course {
    
      &__select-all {
        display: flex;
        flex-direction: row-reverse;
        margin-bottom: 10px;
      }
      
      &__title {
        font-weight: normal;
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.black};
        margin-right: 30px;
        
        &-select {
          margin-top: 15px;
        }
        
        &-search {
          margin-top: 15px;
        }
      }
      
      &__search {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 8px 0 20px 14px;
        padding: 0px 5px;
        border-radius: 5px;
        border: 1px solid ${COLORS.inputPlaceholder};
  
        &-input {
          width: 100%;
          appearance: none;
          border: none;
          outline: none;
          font-size: 16px;
          height: 30px;
        }
        
        &-title {
          margin-top: 40px;
          font-weight: 500;
          font-size: 20px;
          line-height: 23px;
          letter-spacing: 0.15px;
          color: ${COLORS.black};
        }
      }
      
      &__selected {
        color: ${COLORS.black};
        margin-top: 8px;
        
        &-title {
          margin-top: 16px;
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
          height: 28px;
          background-color: ${COLORS.greyBack};
          margin-left: 8px;
          outline: none;
          
          &-text {
            padding-left: 7px;
            font-size: 16px;
            line-height: 28px;
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
`;

export default WithDirection(StudentsAddWrapper);
