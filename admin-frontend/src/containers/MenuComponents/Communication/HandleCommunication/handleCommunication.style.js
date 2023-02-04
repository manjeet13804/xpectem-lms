import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const HandleCommunicationWrapper = styled.div`
  .main-title {
    font-size: 16px;
    margin-bottom: 27px;
    font-style: normal;
    font-weight: normal;
    letter-spacing: 0.4px;
    color: ${COLORS.black};
  }
  .page {
    display: flex;
    justify-content: flex-start;
    @media only screen and (max-width: 767px) {
      flex-direction: column;
    }
    &__wrapper {
      height: 100%;
      display: flex;
      flex-direction: column;
      &_left {
        width: 760px;
        border-right: 1px solid ${COLORS.grayDashed};
        @media only screen and (max-width: 767px) {
          margin-bottom: 30px;
          border: none;
        }
      }
      @media only screen and (max-width: 767px) {
        width: 100%;
      }
    }
    &__title {
      font-size: 16px;
      line-height: 28px;
      margin-bottom: 12px;
    }
    &__search {
      margin-top: 18px;
      margin-bottom: 42px;
      padding: 1px;
      height: 36px;
      display: flex;
      align-items: center;
      @media only screen and (max-width: 560px) {
        margin: 20px 0;
      }
    }
    &__input {
      display: block;
      font-size: 16px;
      width: calc(100% - 18px);
      height: 30px;
      appearance: none;
      border: none;
      outline: none;
      margin: 0 18px;
      &_error {
        border: 1px solid ${COLORS.redPomegranate};
      }
    }
    &__dialog-content {
      padding-right: 9px;
      @media only screen and (max-width: 767px) {
        padding: 0;
      }
    }
    .reply-group {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      margin-top: 16px;
      padding-top: 20px;
      width: 100%;
      height: 100%;
      border-top: 1px solid ${COLORS.grayDashed};
      &__img {
        margin-right: 24px;
        display: block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
      &__wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @media only screen and (max-width: 767px) {
          width: calc(100% - 56px);
          padding-right: 10px;
        }
      }
      &__btn {
        padding: 0 20px;
        background: rgba(206, 206, 206, 0.87);
        border-radius: 4px;
        width: 140px;
        height: 40px;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.75px;
        color: ${COLORS.black};
        mix-blend-mode: normal;
        opacity: 0.87;
        outline: none;
        text-transform: uppercase;
        @media only screen and (max-width: 767px) {
          font-size: 11px;
        }
        &_send-completed {
          margin-right: 34px;
          width: 210px;
        }
        &_send-remain {
          width: 200px;
        }
        &_abort {
          margin-left: 6px;
        }
      }
      &__message-header {
        margin-bottom: 14px;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        display: flex;
        align-items: flex-end;
        letter-spacing: 0.4px;
        color: ${COLORS.black};
      }
      &__text-format-simple {
        margin-top: 10px;
      }
      &__drag-and-drop {
        margin-top: 20px;
      }
      &__wrap-btn {
        display: flex;
        margin-top: 90px;
        padding-top: 38px;
        justify-content: flex-start;
        border-top: 1px solid ${COLORS.grayDashed};
      }
    }
    .previos-communication {
      margin-top: 50px;
      &__wrap-info {
        display: flex;
        justify-content: space-between;
        max-width: 200px;
      }
      &__title {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        letter-spacing: 0.25px;
        color: ${COLORS.mercuryBlack};
        mix-blend-mode: normal;
        opacity: 0.87;
      }
      &__number {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        letter-spacing: 0.25px;
        color: ${COLORS.mercuryBlack};
        mix-blend-mode: normal;
        opacity: 0.87
      }
    }
  }
`;

export default WithDirection(HandleCommunicationWrapper);
