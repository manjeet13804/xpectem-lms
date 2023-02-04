import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const StudentsImportWrapper = styled.div`
  .course {

    &__courses-wrapper {
      width: 100%;
      max-width: 584px;
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
        line-height: 27px;
        color: ${COLORS.greyInput};
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
    
    &__button {
      display: flex;
      justify-content: flex-end;
      margin-top: 84px;
      
      &-add {
        min-width: 140px;
        height: 40px;
        color: ${COLORS.black};
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
      }
    }
  }

  .import-block {
    display: flex;
    flex-direction: column;
    color: ${COLORS.black};
    
    &__import-btn {
      display: flex;
      width: 100%;
    }
    
    &__title {
      font-size: 16px;
      line-height: 28px;
    }
    
    &__text {
      font-size: 16px;
      line-height: 28px;
      margin-top: 16px;
      &-indent {
        margin-top: 24px;
      }
      @media only screen and (max-width: 767px) {
        margin-left: 8px;  
      }
    }
    
    &__preview-text {
      color: ${COLORS.black};
      @media only screen and (max-width: 767px) {
        margin-left: 8px;
      }
      
      &-title {
        font-weight: 500;
        font-size: 20px;
        line-height: 23px;
        letter-spacing: 0.15px;
        margin-top: 16px;
      }
      
      &-describe {
        font-weight: normal;
        font-size: 16px;
        line-height: 28px;
        letter-spacing: 0.4px;
        margin-top: 24px;
      }
      
      &-field {
        font-weight: 500;
        margin-top: 24px;
      }
    }
    
    &__upload {
      display: flex;
      flex-direction: row;
      margin-top: 32px;
      @media only screen and (max-width: 767px) {
        display: flex;
        flex-direction: column;
        margin-left: 8px;
      }
      
      &-form {
        width: 100%;
        max-width: 568px;
      }
      
      &-btn {
        align-self: flex-end;
        margin-left: 16px;
        &-preview {
          width: 140px;
          height: 40px;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          background-color: ${COLORS.grayAlto};
          color: ${COLORS.black};
          border-radius: 4px;
          border: none;
          outline: none;
          margin-top: 10px;
          cursor: pointer;
        }
        @media only screen and (max-width: 767px) {
          align-self: flex-start;
          margin-top: 8px;
          margin-left: 0;
        }
      }
    }
    
    &__download {
      &-btn {
        margin-top: 24px;
        &-file {
          height: 40px;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          outline: none;
          background-color: ${COLORS.grayAlto};
          border-radius: 4px;
          border: none;
          cursor: pointer;
        }
      } 
    }
    
    &__import-btn-file {
      min-width: 140px;
      margin-top: 24px;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: ${COLORS.black};
       height: 40px;
      background-color: ${COLORS.grayMercury};
      outline: none;
    }
  }
`;

export default WithDirection(StudentsImportWrapper);
