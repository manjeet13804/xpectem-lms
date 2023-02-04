import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const SendNotificationWrapper = styled.div`
  .page {
    &__event-notification {
      padding: 12px 0 50px 0;
      max-width: 568px;
    }
    &__input {
      margin-left: 0px;
      padding-left: 4px;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      letter-spacing: 0.4px;
      color: ${COLORS.greyInput};
      border: none;
      opacity: 0.8;
      &_error {
        border-radius: 2px;
        border: 1px solid ${COLORS.redPomegranate};
      }
      &:focus {
        outline: none;
      }
    }
    &__description {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      letter-spacing: 0.4px;
      color: ${COLORS.black};
    }
    &__title {
      margin-top: 12px;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      letter-spacing: 0.15px;
      color: ${COLORS.black};
      mix-blend-mode: normal;
      opacity: 0.9;
    }
    &__header-wrap {
      margin-top: 24px;
      margin-bottom: 10px;
      display: grid;
      grid-template-columns: 1fr;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      letter-spacing: 0.4px;
      color: ${COLORS.black};
      mix-blend-mode: normal;
      opacity: 0.9;
    }
    &__text-format-wrap {
      margin-top: 10px;
      &_error {
        border-radius: 2px;
        border: 1px solid ${COLORS.redPomegranate};
      }
    }
    &__button-wrap {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 20px;
      margin-top: 20px;
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
      cursor: pointer;
      &:focus {
        outline: none;
      }
    }
    &__select-wrap {
      display: grid;
      grid-template-rows: auto 1fr;
      row-gap: 5px;
      margin-top: 20px;
      &-title {
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        letter-spacing: 0.4px;
        color: ${COLORS.black};
        mix-blend-mode: normal;
        opacity: 0.87;
      }
    }
    &__search {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 8px 0 20px 14px;

      &-input {
        width: 100%;
        appearance: none;
        border: none;
        outline: none;
        margin-left: 18px;
        font-size: 16px;
        line-height: 27px;
        color: ${COLORS.greyInput};
      }
      
      &-title {
        margin-top: 40px;
        font-weight: 500;
        font-size: 20px;
        line-height: 23px;
        letter-spacing: 0.15px;
        color: ${COLORS.black};
      }
    }
  }
  .ant-select {
    height: 30px;
    font-size: 16px;
    color: ${COLORS.black};
    width: 100%;
    border: 1px solid ${COLORS.inputPlaceholder};
    padding: 0 5px;
    border-radius: 5px;
    &-selection {
      border: none;
      &:active {
        border: none;
      }
      &:focus {
        border: none;
        box-shadow: none;
      }
      &__placeholder {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        letter-spacing: 0.4px;
        color: ${COLORS.greyInput};
      }
    }
    &-open {
      .ant-select-selection {
        boder: none;
        box-shadow: none;
        &:active {
          border: none;
        }
        &:focus {
          border: none;
          box-shadow: none;
        }
      }
    }
    &-dropdown-menu-item {
      font-style: normal !important;
      font-weight: normal !important;
      font-size: 15px !important;
      color: rgba(0, 0, 0, 0.9) !important;
    }
    
    .ant-select-selection {
      background: border-box;
    }
    &_error {
         background: #fff6f6;
         border: 1px solid #e0b4b4;
         border-radius: 4px;
    }
    &__validErr {
      color: red;
      font-size: 12px;
      opacity: 0.72;
      letter-spacing: 0.4px;
    }
  }
`;

export default WithDirection(SendNotificationWrapper);
