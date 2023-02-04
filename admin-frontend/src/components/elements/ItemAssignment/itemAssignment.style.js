import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const ItemAssignmentWrapper = styled.div`
  .item-assignment {
    max-width: 400px;
    margin-bottom: 10px;
    
    &__row {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    
    &__checkbox {
      margin-right: 20px;
    }
    
    &__title {
      font-weight: normal;
      font-size: 16px;
      line-height: 32px;
      color: ${COLORS.black};
      margin: 10px 0;
    }
    
    &__date {
      border: none;
      color: ${COLORS.grayDove};
      font-weight: normal;
      font-size: 16px;
      line-height: 28px;
      margin-right: 10px;
    }

    &__date-picker{
      position: absolute;
      top:0;
    }

    &__add-icon {
      cursor: pointer;
      margin-left: 10px;
    }

    &__edit-icon {
      cursor: pointer;
      margin-right: 10px;
      margin-left: 10px;
      width: 20px;
      height: 20px;
    }

    &__trash-icon {
      cursor: pointer;
      width: 20px;
      height: 20px;
    }
  }
`;

export default WithDirection(ItemAssignmentWrapper);
