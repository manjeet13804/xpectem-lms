import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const ItemAssignmentInfoWrapper = styled.div`
  .item-assignment-info {
    max-width: 400px;
    margin-left: 16px;
    margin-bottom: 10px;
    
    &__item {
      font-weight: normal;
      font-size: 12px;
      color: ${COLORS.blue};
      display: flex;
      align-self: center;
      min-width: 40px;
      
      &_passed {
        color: ${COLORS.blue};
      }
      
      &_failed {
        color: ${COLORS.redPomegranate};
      }
      
      &:first-child {
        margin-right: 3px;
      }
    }
    
    &__row {
      display: flex;
      flex-direction: row;
    }
    
    &__checkbox {
      margin-right: 20px;
    }
    
    &__title {
      font-weight: normal;
      font-size: 16px;
      line-height: 32px;
      color: ${COLORS.black};
      margin-top: 10px;
    }
    
    &__date {
      border: none;
      color: ${COLORS.grayDove};
      font-weight: normal;
      font-size: 12px;
    }
  }
`;

export default WithDirection(ItemAssignmentInfoWrapper);
