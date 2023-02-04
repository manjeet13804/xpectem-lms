import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const RelativeTimeWrapper = styled.div`
  .relative-time {
    &__content {
      position: fixed;
      top: -100%;
      right: -100%;
      left: -100%;
      background: rgba(0,0,0,0.5);
      z-index: 2;
      transition: all .5s ease-in;
      &_close {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
    &__wrapper {
      padding: 24px 27px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      min-width: 605px;
      min-height: 290px;
      background: ${COLORS.white};
      @media only screen and (max-width: 767px) {
        min-width: 400px;
        min-height: 150px;
      }
      @media only screen and (max-width: 560px) {
        min-width: 300px;
      }
    }
    &__close-wrap {
      position: absolute;
      top: 13px;
      right: 15px;
      cursor: pointer;
      &:focus {
        outline: none;
      }
      @media only screen and (max-width: 767px) {
        margin: 10px 10px 0 0;
      }
    }
    &__button {
      margin-top: 37px;
      width: 140px;
      height: 40px;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      display: grid;
      align-items: center;
      justify-content: center;
      letter-spacing: 0.75px;
      text-transform: uppercase;
      color: ${COLORS.black};
      mix-blend-mode: normal;
      opacity: 0.87;
      background: rgba(206, 206, 206, 0.87);
      border-radius: 4px;
      &:focus {
        outline: none;
      }
    }
    &__title {
      font-style: normal;
      font-weight: normal;
      font-size: 24px;
      color: ${COLORS.black};
      mix-blend-mode: normal;
      opacity: 0.9;
    }
    &__item-wrap {
      display: grid;
      grid-template-columns: minmax(175px, 204px) 1fr;
      column-gap: 33px;
      &:nth-child(odd) {
        margin-top: 24px;
      }
      &-info {
        display: grid;
        grid-template-rows: 1fr 1fr;
        justify-content: flex-start;
        align-items: center;
      }
      &-numbers {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        letter-spacing: 0.4px;
        color: ${COLORS.greyInput};
        align-self: flex-start;
      }
    }
  }
  .ant-checkbox-wrapper {
    display: grid;
    grid-template-columns: 20px 1fr;
    align-items: center;
    column-gap: 24px;
    &:hover {
      .ant-checkbox-inner {
        border: 1px solid ${COLORS.black} !important;
      }
    }
    .ant-checkbox-input {
      &:hover {
        .ant-checkbox-inner {
          border: 1px solid ${COLORS.black} !important;
        }
      }
      &:focus {
        .ant-checkbox-inner {
          border: 1px solid ${COLORS.black} !important;
        }
      }
    }
    .ant-checkbox + span {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      letter-spacing: 0.4px;
      color: ${COLORS.black};
      mix-blend-mode: normal;
      opacity: 0.87;
    }
    .ant-checkbox-inner {
      width: 20px !important;
      height: 20px !important;
      border-radius: 50%;
      border: 1px solid ${COLORS.black} !important;
      background: ${COLORS.white};
      &::after {
        content: '';
        position: absolute;
        width: 10px !important;
        height: 10px !important;
        border: none;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
      }
    }
    .ant-checkbox-checked {
      .ant-checkbox-inner {
        border: 1px solid ${COLORS.black} !important;
        &::after {
          content: '';
          position: absolute;
          width: 10px !important;
          height: 10px !important;
          border: none;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: ${COLORS.black} !important;
        }
      } 
    }
  }
  .ant-slider {
    margin: 32px 30px 28px 20px !important;
    &-rail {
      background: rgba(0, 0, 0, 0.26);
    }
    &-track {
      background: ${COLORS.black} !important;
    }
    &-handle {
      width: 12px;
      height: 12px;
      background: ${COLORS.black} !important;
      border: none;
      &:focus {
        background: ${COLORS.black} !important;
        box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.26);
      }
    }
    &-mark {
      top: -20%;
    }
    &-mark-text {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      letter-spacing: 0.4px;
      color: ${COLORS.black};
      mix-blend-mode: normal;
      opacity: 0.87;
      &:nth-child(1n) {
        left: -4% !important;
      }
      &:nth-child(2n) {
        left: 110% !important;
      }
    }
    &-dot {
      display: none;
    }
  }
`;

export default WithDirection(RelativeTimeWrapper);
