import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const SelectOfNumberWrapper = styled.div`
  .select {
    position: relative;
    width: 220px;
    min-height: 36px;
    display: flex;
    align-items: center;
    flex-direction: column;
    outline: none;
    &__main {
      cursor: pointer;
      width: 100%;
      height: 36px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &:focus {
        outline: none;
      }
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
      transition: transform .5s;
      transform: rotate(45deg);
      &_down {
        transform: rotate(135deg);
      }
    }
    &__item {
      display: flex;
      width: 100%; 
      height: 36px;
      font-size: 16px;
      line-height: 28px;
      color: ${COLORS.black};
      cursor: pointer;
      &-icon {
        width: 36px;
        margin-left: 11px;
      }
      &:first-child {
        margin-top: 8px;
      }
      &:focus {
        outline: none;
      }
    }
    &__block {
      position: absolute;
      top: 100%;
      width: 100%;
      border: 1px solid ${COLORS.silver};
      border-radius: 4px;
      background-color: ${COLORS.white};
      z-index: 1;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
      &_closed {
        z-index: 0;
        box-shadow: none;
      }
    }
    &__custom-range {
      min-width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid ${COLORS.greyAlto};
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      letter-spacing: 0.4px;
      color: ${COLORS.black};
      cursor: pointer;
      &:focus {
        outline: none;
      }
    }
  }
`;

export default WithDirection(SelectOfNumberWrapper);
