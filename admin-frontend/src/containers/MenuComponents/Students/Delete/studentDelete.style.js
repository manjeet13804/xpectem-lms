import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const StudentDeleteWrapper = styled.div`
  .delete-block {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 92px;
    &__text {
      display: flex;
      flex-direction: column;
      max-width: 550px;
      color: ${COLORS.black};
      margin-left: 24px;
      &-title {
        font-weight: 500;
        font-size: 20px;
        line-height: 23px;
        letter-spacing: 0.15px;
      }
      &-message {
        font-size: 16px;
        line-height: 28px;
        margin-top: 34px;
      }
      &-confirm {
        font-size: 12px;
        line-height: 16px;
        margin-top: 34px;
      }
      &-input {
        width: 100%;
        outline: none;
        border: none;
        margin-top: 8px;
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.greyInput};
      }
    }
  }
  .button {
    display: flex;
    justify-content: flex-end;
    margin-top: 32px;
    @media only screen and (max-width: 767px) {
      justify-content: center;
    }
    &__delete {
      width: 140px;
      height: 40px;
      border-radius: 4px;
      background-color: ${COLORS.redPomegranate};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: ${COLORS.white};
      margin-right: 24px;
      outline: none;
    }
    &__cancel {
      width: 140px;
      height: 40px;
      border-radius: 4px;
      background-color: ${COLORS.grayAlto};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: ${COLORS.black};
      outline: none;
    }
    &__link{
      &_disabled-link {
        pointer-events: none;
    }
    }
  }
`;

export default WithDirection(StudentDeleteWrapper);
