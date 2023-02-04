import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const QuestionsAnswersWrapper = styled.div`
  .questions-answers {
    background-color: ${COLORS.grey};
    &__title {
      font-weight: normal;
      font-size: 20px;
      color: ${COLORS.black};
      margin: 30px 0 15px 0;
    }
  }
  
  .add-question {
    max-width: 550px;

    &__title {
      font-weight: normal;
      font-size: 20px;
      color: ${COLORS.black};
      margin: 15px 0;
    }
    
    &__input {
      &-title {
        font-weight: normal;
        font-size: 20px;
        color: ${COLORS.black};
        margin: 10px 0;
      }
      
      &-text {
      
        &-add {
          width: 100%;
          height: 40px;
          border-radius: 4px;
          font-weight: normal;
          font-size: 16px;
          color: ${COLORS.greyInput};
          outline: none;
          border: none;
        }
      }
      
      &-button {
        display: flex;
        justify-content: flex-end;
        
        &-add {
          width: 120px;
          height: 40px;
          border-radius: 4px;
          background-color: ${COLORS.grayAlto};
          font-weight: 500;
          font-size: 16px;
          line-height: 16px;
          color: ${COLORS.black};
          outline: none;
          margin-top: 25px;
        }
     }
    }
    
    &__question, &__answer {
      &-title {
        font-weight: normal;
        font-size: 14px;
        margin-top: 30px;
        margin-bottom: 10px;
      }
    }
 
    &__button {
      display: flex;
      justify-content: flex-end;
      
      &-save {
        width: 120px;
        height: 40px;
        border-radius: 4px;
        background-color: ${COLORS.grayAlto};
        font-weight: 500;
        font-size: 16px;
        line-height: 16px;
        color: ${COLORS.black};
        outline: none;
        margin-top: 50px;
      }
    }
  }
`;

export default WithDirection(QuestionsAnswersWrapper);
