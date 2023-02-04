import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const ItemExamInfoWrapper = styled.div`
  .item-exam-info {
    margin-left: 16px;
  
    &__title {
      font-weight: normal;
      font-size: 16px;
      line-height: 32px;
      color: ${COLORS.black};
      margin: 10px 0;
    }
  
    &__row {
      display: flex;
      flex-direction: row;
    }
    
    &__column {
      display: flex;
      flex-direction: column;
    }
    
    &__input {
      display: flex;
      flex-direction: row;
      width: 100%;
    }
    
    &__student-logs {
      display: flex;
      flex-direction: column;
      margin: 10px 0 0 0;
    }
    
    &__input {
      font-weight: normal;
      font-size: 12px;
      line-height: 12px;
      color: ${COLORS.grayDove};
      margin-right: 10px;
      margin-bottom: 1px;
      
      &-title {
        min-width: 160px;
        max-width: 160px;
      }
      
      &-text {
        margin-top: 2px;
        font-weight: normal;
        font-size: 14px;
        min-width: 48px;
         &_failed {
          color: ${COLORS.redFlamingo};
        }
        
        &_passed-distinction {
          color: ${COLORS.green};
        }
      }
           
      &-number {
        text-align: center;
        width: 30px;
        height: 25px;
        padding: 2px;
        font-weight: normal;
        font-size: 14px;
        outline: none;
        border: 1px solid ${COLORS.grayDove};
        margin-left: 10px;
        color: ${COLORS.black};
        
        &_failed {
          color: ${COLORS.redFlamingo};
        }
        
        &_passed-distinction {
          color: ${COLORS.green};
        }
      }
      
      &-date {
        border: none;
        color: ${COLORS.grayDove};
        font-weight: normal;
        font-size: 16px;
        margin-left: 3px;
      }
    }
  }
`;

export default WithDirection(ItemExamInfoWrapper);
