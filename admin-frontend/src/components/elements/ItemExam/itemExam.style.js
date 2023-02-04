import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const ItemExamWrapper = styled.div`
  .item-exam {
    &__title {
      font-weight: normal;
      font-size: 16px;
      line-height: 32px;
      color: ${COLORS.black};
      margin: 10px 0;
      margin-bottom: 10px;
    }

    &__row {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    &__input {
      display: flex;
      flex-direction: row;
      & p {
        font-size: 16px;
        line-height: 32px;
        color: ${COLORS.black};
      }
    }

    &__column {
      display: flex;
      flex-direction: column;
      margin: 10px 0 0 70px;
    }

    &__input {
      width: 130px;
      font-weight: normal;
      font-size: 12px;
      line-height: 12px;
      color: ${COLORS.grayDove};
      margin-right: 10px;

      &:first-child {
        width: 70px;
      }

      &:nth-child(3) {
        width: 180px;
      }

      &-number {
        text-align: center;
        width: 30px;
        height: 25px;
        padding: 2px;
        font-weight: normal;
        font-size: 14px;
        outline: none;
        border: 1px solid ${COLORS.grayDove};
        margin-left: 10px;
        color: ${COLORS.blueNumber} !important;

        &_failed {
          color: ${COLORS.redFlamingo} !important;
        }

        &_passed-distinction {
          color: ${COLORS.green} !important;
        }

        &_passed {
          color: ${COLORS.green} !important;
        }
      }

      &-date {
        border: none;
        color: ${COLORS.grayDove};
        background-color: ${COLORS.greyOrg};
        font-weight: normal;
        font-size: 16px;
        line-height: 28px;
      }
    }

    &__type-passed {
      display: flex;
      align-self: center;
      margin: 0 10px;
      color: ${COLORS.black};
      font-weight: normal;
      font-size: 12px;
      line-height: 14px;
      width: 18px;
    }

    &__add-icon {
      cursor: pointer;
      padding-top: 5px;
      margin-left: 10px;
    }

    &__edit-icon {
      cursor: pointer;
      margin-right: 10px;
    }

    &__trash-icon {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
`;

export default WithDirection(ItemExamWrapper);
