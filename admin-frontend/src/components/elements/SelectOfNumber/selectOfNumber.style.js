import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const SelectAnyTimeWrapper = styled.div`
  .text {
    width: 100%;
    margin-top: 20px;
    color: ${COLORS.black};
  }
  .select {
    width: 300px;
    height: 36px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    outline: none;
    position: relative;
    margin-top: 20px;
    &_close {
      border: 1px solid ${COLORS.silver};
    }
    
    &__title {
      font-weight: normal;
      font-size: 16px;
      line-height: 28px;
      color: ${COLORS.black};
      margin-left: 4px;
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
      color: ${COLORS.black};
      &-icon {
        width: 36px;
        margin-left: 11px;
      }
      &:first-child {
        margin-top: 8px;
      }
    }
    &__block {
      position: absolute;
      width: 300px;
      max-height: 110px;
      overflow-y: auto;
      border: 1px solid ${COLORS.silver};
      border-top: none;
      background-color: ${COLORS.white};
      &_hidden {
        border: none;
      }
    }
  }
`;

export default WithDirection(SelectAnyTimeWrapper);
