import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const StudentsImportStatusWrapper = styled.div`
  .import-status {
    display: flex;
    flex-direction: column;
    color: ${COLORS.black};

    &__error-text {
      display: flex;
      align-self: center;
      font-weight: 500;
      font-size: 20px;
      color: ${COLORS.redFlamingo};
    }

    &__back-btn {
        margin-top: 24px;
        height: 40px;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        outline: none;
        background-color: ${COLORS.grayAlto};
        border-radius: 4px;
        border: none;
        max-width: 100px;
        cursor: pointer;
    }

    &__icon {
      transform: rotate(180deg);
    }
    
    &__text {
      display: flex;
      flex-direction: column;
      
      @media only screen and (max-width: 767px) {
        margin-left: 16px;  
      }
      
      &-attention {
        display: flex;
        flex-direction: row;
        align-self: center;
        margin-top: 50px;
        
        &-title {
          display: flex;
          align-self: center;
          font-weight: 500;
          font-size: 20px;
          color: ${COLORS.black};
          margin-left: 24px;
        }

        &_is-error {
          align-self: auto;
        }
      }
      
      &-title {
      display: flex;
      flex-direction: column;
      align-self: center;
        margin-top: 70px;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 28px;
        
        &-describe {
          
        }
        
        &-example {
          margin-top: 20px;
        }
      }
    }
  }
`;

export default WithDirection(StudentsImportStatusWrapper);
