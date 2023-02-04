import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const SelectAnyTimeWrapper = styled.div`
 width: 90px;
  .select {
    height: 36px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    outline: none;
    position: relative;
    cursor: pointer;
    
    &__title {
      font-weight: normal;
      font-size: 16px;
      line-height: 28px;
      color: ${COLORS.black};
      margin-left: 10px;
    }
    
    &__icon {
      margin-right: 8px;
      
      &-down {
        transform: rotate(-180deg);
      }
    }
    
    &__item {
      display: flex;
      flex-direction: row;
      width: 100%; 
      height: 36px;
      font-size: 16px;
      line-height: 28px;
      cursor: pointer;
      color: ${COLORS.black};
      
      &-icon {
        width: 36px;
        margin-left: 11px;
      }
      
      &-title {
        margin-left: 10px;
      }
    }
    
    &__block {
      position: absolute;
      width: 89px;
      border: 1px solid ${COLORS.silver};
      border-radius: 4px;
      background-color: ${COLORS.white};
      &_hidden {
        border: none;
      }
    }
  }
`;

export default WithDirection(SelectAnyTimeWrapper);
