import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const DialogItemWrapper = styled.div`
  .dialog-item {
    margin-top: 32px;
    max-width: 800px;
    height: 100%;
    @media only screen and (max-width: 767px) {
      margin: 32px auto 0 auto;
      max-width: 600px;
    }
    &__images-info {
      display: flex;
      justify-content: space-between;
    }
    &__images-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__img {
      display: block;
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
    &__name {
      margin-left: 20px;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      letter-spacing: 0.25px;
      color: ${COLORS.mercuryBlack};
      mix-blend-mode: normal;
      opacity: 0.87;
      @media only screen and (max-width: 767px) {
        font-size: 12px;
      }
    }
    &__date {
      margin-right: 20px;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      letter-spacing: 0.25px;
      color: ${COLORS.mercuryBlack};
      mix-blend-mode: normal;
      opacity: 0.87;
      @media only screen and (max-width: 767px) {
        font-size: 12px;
      }
    }
    &__content {
      width: 664px;
      height: 100%;
      margin: 32px auto 0 auto;
      @media only screen and (max-width: 767px) {
        width: 100%;
      }
    }
    &__title {
      font-weight: 500;
      font-size: 20px;
      letter-spacing: 0.15px;
      mix-blend-mode: normal;
      opacity: 0.87;
      color: ${COLORS.black};
      @media only screen and (max-width: 767px) {
        font-size: 15px;
        margin: 0 auto;
      }
    }
    &__message {
      margin: 13px auto 0 auto;
      display: flex;
      justify-content: space-between;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      letter-spacing: 0.4px;
      color: ${COLORS.black};
      @media only screen and (max-width: 767px) {
        font-size: 12px;
        max-width: 500px;
        padding: 2px;
      }
    }
    &__search-wrap {
      width: 664px;
      margin: 24px auto 0 auto;
      display: flex;
      justify-content: space-between;
      @media only screen and (max-width: 767px) {
        max-width: 500px;
      }
      @media only screen and (max-width: 560px) {
        max-width: 320px;
        flex-direction: column;
        align-items: center;
      }
    }
  }
`;

export default WithDirection(DialogItemWrapper);
