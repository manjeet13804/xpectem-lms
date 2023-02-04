import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const ItemExamModalWrapper = styled.div`
  .item-exam-modal {
    &__row {
      display: flex;
      flex-direction: row;
      margin-bottom: 10px;
      align-items: center;
    }

    &__input {
      display: flex;
      flex-direction: row;
      align-items: center;
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

      &:last-child {
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
        color: ${COLORS.black};

        &_failed {
          color: ${COLORS.redFlamingo};
        }

        &_passed-distinction {
          color: ${COLORS.green};
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
    }

    &__add-icon {
      cursor: pointer;
    }

    &__date-picker {
      position: absolute;
    }

    &__date {
      margin-right: 10px;
    }
  }
`;

export default WithDirection(ItemExamModalWrapper);
