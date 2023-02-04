import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const DialogCommunicationWrapper = styled.div`
  .dialog-communication {
    &__unbordered {
      border: none;
      outline: none;
      text-overflow: ellipsis;
    }

    &__editor {
      color: ${COLORS.black};
      background-color: ${COLORS.white};
      padding-left: 15px;
      white-space: pre-line;
      flex: 1;
    }
    
    &__unbordered:focus {
      border: none;
      box-shadow: none;
    }

    &__item {
      max-width: 632px;
      height: 120px;
      background-color: ${COLORS.white};
      display: flex;
      flex-direction: column;
      border: 1px solid ${COLORS.greyLight};
      margin: 8px 0;
      cursor: pointer;

      &-title {
        width: 100%;
        font-size: 16px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 16px;

        &-firstname {
          margin-right: 5px;
        }
      }

      &-body {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 16px;
        
        &-heading {
          font-weight: normal;
          font-size: 18px;
          color: ${COLORS.black};
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }

        &-icon {
            margin-right: 14px;
        }

        &-closed {
          display: flex;
          justify-content: flex-end;
          padding: 0 16px;
        }
      }
    }

    &__form {
      max-width: 632px;
      display: flex;
      flex-direction: column;
      margin-top: 16px;
      margin-bottom: 10px;

      &-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 64px;
        padding-left: 5px;
        font-size: 16px;
        color: ${COLORS.greyInput};
        cursor: pointer;

        &-avatar {
          min-width: 35px;
          max-width: 35px;
        }

        &-row {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        
        &-name {
          margin-left: 16px;

          &-firstname {
            margin-right: 5px;
          }
        }

        &-date {
          display: flex;
          justify-items: flex-end;
        }
      }

      &-input {
        padding-left: 40px;

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

    &__footer {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__button {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-top: 20px;
      cursor: pointer;

      &-btn {
        cursor: pointer;
        width: 120px;
        height: 40px;
        border-radius: 2px;
        background-color: ${COLORS.greyButton};
        color: ${COLORS.black};
        border: none;
        outline: none;
        font-weight: 500;
        font-size: 14px;

        &_reasign {
          margin-right: 20px;
        }
      }
    }

    &__attached {
      display: flex;
      flex-direction: column;
      margin-top: 30px;
      color: ${COLORS.blueIcon};
      font-weight: 500;
      font-size: 13px;
      padding-left: 40px;

      &-name {
        color: ${COLORS.black};
        margin-top: 5px;
      }

      &-header {
        color: ${COLORS.black};
      }

      &-link {
        &-download {
          &:hover {
          text-decoration: underline;
          cursor: pointer;
          }
        }
      }
    }
  }
`;

export default WithDirection(DialogCommunicationWrapper);
