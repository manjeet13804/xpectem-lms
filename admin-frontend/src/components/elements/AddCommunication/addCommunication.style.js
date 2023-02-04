import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const AddCommunicationWrapper = styled.div`
  .add-communication {

    &__question {
      max-width: 632px;
      height: 64px;
      background-color: ${COLORS.grayWild};
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 16px;
      padding-left: 5px;

      &-avatar {
        min-width: 35px;
        max-width: 35px;
      }

      &-title {
        width: 100%;
        height: 48px;
        font-size: 16px;
        background-color: ${COLORS.white};
        display: flex;
        align-items: center;
        margin: 0 8px;
        padding: 0 8px;
      }
    }

    &__form {
      max-width: 632px;
      display: flex;
      flex-direction: column;
      margin-top: 16px;

      &-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 64px;
        padding-left: 5px;
        font-size: 16px;
        color: ${COLORS.black};

        &-avatar {
          min-width: 35px;
          max-width: 35px;
        }
        
        &-name {
          margin-left: 16px;
          width: 100%;
          &-firstname {
            margin-right: 5px;
          }
        }
      }

      &-input {
        &-title {
          font-size: 14px;
          color: ${COLORS.greyInput};
          margin-top: 20px;
        }

        &-text {
          font-size: 16px;
          color: ${COLORS.black};
          margin-top: 10px;
        }
      }
      
      &-line {
        width: 100%;
        border: 1px solid ${COLORS.greyLight};
        margin-top: 30px;
      }
    }

    &__button {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      cursor: pointer;

      &-upload, &-click {
        display: flex;
        flex-direction: row;
      }

      &-text {
        max-width: 215px;
      }

      &-upload {
        max-width: 215px;
        color: ${COLORS.blueIcon};
        font-weight: 500;
        font-size: 16px;
        margin-top: 15px;
        align-items: center;
      }

      &-click {
        max-width: 208px;
        margin-top: 15px;
        justify-content: space-between;
      }

      &-btn {
        cursor: pointer;
        width: 96px;
        height: 32px;
        border-radius: 2px;
        background-color: ${COLORS.greyBtnTitle};
        color: ${COLORS.greyBtnColor};
        border: none;
        outline: none;

        &_send {
          background-color: ${COLORS.blueIcon};
          color: ${COLORS.white};
          margin-left: 16px;
        }
      }
    }
  }
`;

export default WithDirection(AddCommunicationWrapper);
