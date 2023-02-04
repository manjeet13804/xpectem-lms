import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const AdministratorsDeleteWrapper = styled.div`
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
      background-color: ${COLORS.redPomegranate};
      color: ${COLORS.white};
      border: 0;
      height: 40px;
      min-width: 140px;
      width: auto;
      font-weight: bold;
      border-radius: 4px;
      margin-right: 24px;
      &:disabled{
        opacity: 0.7;
      }
    }
    &__cancel {
      border: 0;
      height: 40px;
      min-width: 140px;
      width: auto;
      font-weight: bold;
      background-color: ${COLORS.defaultButtonColor};
      border-radius: 4px;
    }
  }
`;

export default WithDirection(AdministratorsDeleteWrapper);
