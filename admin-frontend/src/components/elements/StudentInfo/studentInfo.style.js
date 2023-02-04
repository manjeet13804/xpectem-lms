import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const StudentInfoWrapper = styled.div`
  .student-info {
    width: 390px;
    height: 100%;
    &__info-block {
      display: flex;
      flex-direction: column;
      &_accounting {
        margin-top: 26px;
        padding-left: 30px;
      }
      &_main {
        padding-left: 30px;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
      }
    } 
    &__img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    &__name-wrapper {
      margin-left: 20px;
    }
    &__name-data {
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      letter-spacing: 0.15px;
      color: ${COLORS.black};
      mix-blend-mode: normal;
      opacity: 0.87;
    }
    &__accounting-panel {
      margin-top: 6px;
      display: flex;
      justify-content: space-between;
    }
    &__accounting-item {
      min-width: 30px;
      min-height: 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      letter-spacing: 0.4px;
      color: ${COLORS.black};
      mix-blend-mode: normal;
      opacity: 0.87;
    }
    &__accounting-data {
      margin-right: 8px;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 28px;
      letter-spacing: 0.4px;
      color: ${COLORS.blueMercury};
      &::nth-child(3) {
        margin: 0;
      }
    }
    &__accounting-date {
      margin-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__accounting-score {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 50px;
      min-height: 36px;
      border: 2px solid ${COLORS.greyMercury};
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      letter-spacing: 0.4px;
      color: ${COLORS.redPomegranate};
    }
    &__info-title {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      letter-spacing: 0.4px;
      color: ${COLORS.black};
      &_alone {
        margin-top: 24px;
      }
    }
    &__info_subtitle {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      letter-spacing: 0.25px;
      color: ${COLORS.black};
    }
    &__info-item {
      margin-top: 4px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    &__info-item-title {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      letter-spacing: 0.25px;
      color: ${COLORS.mercuryBlack};
      mix-blend-mode: normal;
      opacity: 0.87;
      span {
        display: block;
        width: 100%;
      }
      &_account {
        min-width: 100px;
        color: ${COLORS.black};
      }
    }
    &__info-item-data {
      margin-left: 12px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      letter-spacing: 0.25px;
      color: ${COLORS.mercuryBlack};
      mix-blend-mode: normal;
      opacity: 0.87;
    }
    .ant-collapse {
      margin-top: 38px;
      background: ${COLORS.white};
      border: none;
      .ant-collapse-item {
        border: none;
        .ant-collapse-header {
          padding: 8px 0;
          padding-left: 30px;
          border-bottom: 1px solid ${COLORS.grayDashed};
          border-radius: 0;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          letter-spacing: 0.25px;
          color: ${COLORS.mercuryBlack};
          mix-blend-mode: normal;
          opacity: 0.87;
          .arrow {
            left: auto;
            right: 16px;
            transform: rotate(90deg);
          }
        }
      }
      .ant-collapse-content {
        border-radius: 0;
        border: none;
      }
      .ant-collapse-item-active {
        .ant-collapse-header {
          .arrow {
            left: auto;
            right: 16px;
            transform: rotate(270deg);
          }
        }
      }
    }
  }
`;

export default WithDirection(StudentInfoWrapper);
