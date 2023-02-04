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
      margin: 30px 0 15px 10px;
      display: flex;
      justify-content: space-between;
      max-width: 812px;
    }

    &__access {
      &-wrapper {
        margin-top: 5px;
        max-width: 817px;
      }

      display: flex;
      justify-content: center;
      align-items: center;
      width: fit-content;
      margin: 0 auto;
      border: 1px solid ${COLORS.grayBorder};
      border-radius: 5px;
      &-item {
        cursor: pointer;
        padding: 10px;
        width: 200px;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        &_select {
          border: 1px solid ${COLORS.blue};
          background-color: ${COLORS.blue};
          color: ${COLORS.white};
        }
        &_student {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          border-top-right-radius: unset;
          border-bottom-right-radius: unset;
        }

        &_admin {
          border-top-right-radius: unset;
          border-bottom-right-radius: unset;
          border-top-left-radius: unset;
          border-bottom-left-radius: unset;
        }

        &_course {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          border-top-left-radius: unset;
          border-bottom-left-radius: unset;
        }
      }
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
        margin: 15px 0;
      }
      
      &-text {
      
        &-add {
          width: 100%;
          height: 40px;
          border-radius: 4px;
          font-weight: normal;
          font-size: 16px;
          color: ${COLORS.greyInput};
          border: 1px solid #F1F1F1;
          margin-bottom: 5px;
          outline: none;
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
      justify-content: space-between;
      
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

  .qa-view {
    &__wrapper {
      border: 1px solid lightgray;
      padding: 20px;
    }

    &__question {
      font-size: 18px;
      font-weight: 700;
    }
  }
`;

export default WithDirection(QuestionsAnswersWrapper);
