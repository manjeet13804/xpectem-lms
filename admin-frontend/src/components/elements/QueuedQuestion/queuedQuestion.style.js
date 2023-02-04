import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const QueuedQuestionWrapper = styled.div`
  .queued-question {
    display: flex;
    flex-direction: column;
    max-width: 250px;
    height: 100%;
    margin-left: 16px;
    &__title {
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      }
    &__item-wrapper {
      margin-top: 10px;
      height: 100%;
      position: relative;
      &:after {
        content: '';
        top: 0;
        right: 0;
        position: absolute;
        height: 726px;
        border-right: 1px solid ${COLORS.grayDashed};
      }
      @media only screen and (max-width: 767px) {
        &:after {
          content: '';
          height: 100%;
          border-right: none;
        }
      }
    }
    &__item {
      width: 231px;
      height: 36px;
      display: flex;
      mix-blend-mode: normal;
      align-items: center;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      color: ${COLORS.mercuryBlack};
      cursor: pointer;
      &:focus {
        outline: none;
      }
    }
    &__item-title {
      width: 119px;
      margin-right: 16px;
      position: relative;
      &:before {
        content: '';
        width: 100%;
        height: 2px;
        bottom: 0;
        left: -150%;
        position: absolute;
        background: ${COLORS.mercuryBlack};
        transition: .5s left;
      }
      &:focus {
        &:before {
          left: 0;
        }
      }
      &_active {
        &:before {
          left: 0;
        }
      }
    }
    &__item-img {
      margin-right: 12px;
    }
    &__item-numbers {
      width: 61px;
      text-align: right;
    }
  }
`;

export default WithDirection(QueuedQuestionWrapper);
