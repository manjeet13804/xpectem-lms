import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const AddCommunicationWrapper = styled.div`
  .add-message{
    
    &__question {
      max-width: 632px;
      height: 64px;
      background-color: ${COLORS.grayWild};
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 16px;
      padding-left: 5px;
      position: relative;

      &::before {
        position: absolute;
        content: '';
        width: 12px;
        height: 12px;
        background-color: ${COLORS.grayWild}; 
        margin-left: 30px;
        margin-top: -32px;
        transform: rotate(45deg);
      }

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
      background-color: ${COLORS.grayWild};

      &::before {
        content: '';
        width: 12px;
        height: 12px;
        background-color: ${COLORS.grayWild}; 
        margin-left: 35px;
        margin-top: -7px;
        transform: rotate(45deg);
      }

      &-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 64px;
        padding-left: 5px;
        font-size: 16px;
        color: ${COLORS.black};
        margin-top: -5px;

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
          margin: 0 80px;
        }

        &-text {
          font-size: 16px;
          color: ${COLORS.black};
          margin: 10px 80px 0 80px;
        }
      }
      
      &-line {
        border: 1px solid ${COLORS.greyLight};
        margin: 30px 80px 0 80px;
      }
    }

    &__upload-info {
      margin: 0 80px 10px 80px;
    }

    &__about-file {
      font-size: 12px;
      margin-bottom: 0;
      display: flex;
    }
  
    &__bold-text {
      font-weight: 600;
      white-space: nowrap;
      margin-right: 5px;
    }
  
    &__upload-error {
      color: crimson;
    }

    &__button {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 10px 80px 20px 80px;
      cursor: pointer;

      &-text {
        max-width: 215px;
      }

      &-upload, &-click {
        display: flex;
        flex-direction: row;
      }

      &-upload {
        max-width: 300px;
        color: ${COLORS.blueIcon};
        font-weight: 500;
        font-size: 16px;
        align-items: center;
      }

      &-click {
        justify-content: space-between;
      }

      &-btn {
        cursor: pointer;
        width: 96px;
        border-radius: 2px;
        background-color: ${COLORS.greyButton};
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
