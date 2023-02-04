import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const GroupsImportWrapper = styled.div`
  .import-block {
    display: flex;
    flex-direction: column;
    color: ${COLORS.black};
    
    &__title {
      font-size: 16px;
      line-height: 28px;
      margin-left: 16px;
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
          background-color: ${COLORS.grayMercury};
          outline: none;
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
          background-color: ${COLORS.grayMercury};
          outline: none;
        }
      } 
    }
    
    &__import-btn {
      margin-top: 10px;
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

export default WithDirection(GroupsImportWrapper);
