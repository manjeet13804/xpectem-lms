import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const MenuNotice = styled.div`
  .menuNotice {
    position: relative;
    cursor: default;

    &__menu-button {
      border: none;
      padding: 0;
      margin: 0;
      position: relative;
      display: flex;
      align-items: flex-end;
      outline: none;
      cursor: pointer;
      background-color: transparent;
    }

    &__counter {
      box-sizing: border-box;
      border-radius: 50%;
      background-color: ${COLORS.redPomegranate};
      color: ${COLORS.white};
      width: 21px;
      height: 21px;
      font-size: 13px;
      line-height: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: -8px;
      right: 8px;
    }

    &__menu-block {
      z-index: 20;
      position: absolute;
      top: 40px;
      right: -30px;
      max-width: 432px;
      width: 85vw;
      background-color: ${COLORS.grayMineShaft};
      padding-bottom: 16px;
      display: flex;
      flex-direction: column;

      &:after {
        content: '';
        display: block;
        position: absolute;
        top: -20px;
        right: 30px;
        border: 10px solid transparent;
        border-bottom: 10px solid ${COLORS.grayMineShaft};
      }

    }

    &__title {
      color: ${COLORS.grayAlto};
      font-size: 20px;
      line-height: 23px;
      margin: 12px 16px;
    }

    &__notification-item {
      display: flex;
      flex-direction: column;
      background-color: ${COLORS.white};
      border: 2px solid ${COLORS.grayMineShaft};
      align-items: flex-start;
      border-bottom: none;
      padding: 40px 0 16px 0;
    }

    &__notification-body {
      display: flex;
    }

    &__notification-title {
      font-size: 20px;
      line-height: 23px;
      color: ${COLORS.grayMineShaft};
      margin-bottom: 17px;
      padding: 0 16px 0 14px;
    }

    &__notification-text {
      font-size: 14px;
      line-height: 20px;
      color: ${COLORS.grayMineShaft};
      margin-bottom: 16px;
      padding: 0 16px 0 14px;
    }

    &__notification-separator {
      width: 100%;
      height: 1px;
      border: none;
      border-top: 1px solid ${COLORS.grayMercury};
      margin: 0;
    }

    &__remove-btn {
      align-self: flex-end;
      border: none;
      font-size: 12px;
      line-height: 14px;
      color: ${COLORS.grayMineShaft};
      margin-top: 16px;
      outline: none;
      cursor: pointer;
    }

    &__empty {
      display: flex;
      padding-bottom: 15px;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: ${COLORS.white};

      &-header {
        font-size: 18px;
        line-height: 21px;
      }

      &-description {
        font-size: 14px;
      }
    }
  }
`;


const MenuNoticeWrapper = WithDirection(MenuNotice);

export { MenuNoticeWrapper };
