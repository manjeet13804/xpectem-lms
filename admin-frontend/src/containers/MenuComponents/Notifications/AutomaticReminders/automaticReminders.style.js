import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const AutomaticRemindersWrapper = styled.div`
  .page {
    max-width: 876px;
    &__message-notification, &__event-notification {
      padding: 12px 0 50px 0;
    }
    &__input, &__search-wrap-input {
      padding-left: 4px;
      font-style: normal;
      font-weight: normal;
      max-width: 500px;
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
    &__search-wrap {
      position: relative;
      margin-top: 12px;
      display: grid;
      grid-template-columns: 18px 1fr;
      grid-template-rows: 1fr 24px;
      column-gap: 12px;
      grid-template-areas: "title title" "icon input" "search-data search-data";
      max-width: 500px;
      &-title {
        grid-area: title;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        letter-spacing: 0.4px;
        color: ${COLORS.black};
        mix-blend-mode: normal;
        opacity: 0.9;
      }
      &-icon {
        grid-area: icon;
        align-self: center;
      }
      &-input {
        grid-area: input;
      }
      &-data {
        grid-area: search-data;
        margin-top: 10px;
        width: 100%;
        padding-left: 8px;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
        border-radius: 4px;
        background: ${COLORS.white};
        overflow: auto;
        max-height: 120px;
      }
      &-item {
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 28px;
        color: ${COLORS.black};
        cursor: pointer;
        &:focus {
          outline: none;
        }
      }
    }
    &__current-item {
      margin-top: 10px;
      display: grid;
      grid-template-columns: auto minmax(50px, auto) 25px;
      justify-content: flex-start;
      align-items: center;
      color: ${COLORS.black};
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      gap: 5px;
      &-title {
        font-style: normal;
        font-weight: normal;
        letter-spacing: 0.4px;
        color: ${COLORS.black};
        mix-blend-mode: normal;
        opacity: 0.9;
      }
      &-close {
        display: grid;
        align-items: center;
        cursor: pointer;
        &:focus {
          outline: none;
        }
      }
      &-svg {
        width: 25px;
        height: 25px;
      }
    }
    &__button-wrap {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 20px;
      margin-top: 20px;
    }
    
    &__loader {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 50px;
    }
    
    &__radio {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30px;
      color: ${COLORS.black};
      font-size: 12px;
      letter-spacing: 0.4px;
    }
    
    &__text-formatting {
      margin-top: 20px;
    }
  }
  .table-report{
    &__table {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }

    &__header {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 37px;
      width: fit-content;
      background-color: ${COLORS.greyBGElement};
      font-weight: bold;
      font-size: 16px;
      line-height: 28px;
      color: ${COLORS.black};
      margin-top: 24px;
      padding-left: 12px;
    }

    &__row {
      display: flex;
      flex-direction: row;
      min-height: 33px;
      font-weight: normal;
      font-size: 16px;
      line-height: 28px;
      margin-top: 5px;
      padding-left: 12px;
    }

    &__column {
      flex: 1;
      min-width: 200px;
      max-width: 200px;
      margin-left: 16px;
      width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:last-child {
        flex: 2;
        padding-right: 12px;
      }
    }

    &__columnActions {
      flex: 1;
      min-width: 100px;
      max-width: 100px;
      margin-left: 16px;
      width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:last-child {
        flex: 2;
        padding-right: 12px;
      }
    }
  }
  .isoEctionsIcon {
    cursor: pointer;
  }
`;

export default WithDirection(AutomaticRemindersWrapper);
