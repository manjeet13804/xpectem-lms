import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const EditTopicWrapper = styled.div`
    .page {
      display: flex;
      flex-direction: row;
      height: 100%;
      margin-right: 16px;

      &_column {
        flex-direction: column;
      }

      @media only screen and (max-width: 767px) {
        display: flex;
        flex-direction: column; 
        margin-left: 16px;
      }
      &__left {
        display: flex;
        flex-direction: column;
        flex: 1;
        max-width: 568px;
      }
      &__right {
        display: flex;
      }
    }

    .title-topic {
      &__title {
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.black};
      }
      &__label {
        font-size: 14px;
        line-height: 16px;
        color: ${COLORS.black};
        margin-top: 10px;
      }
      &__input {
        width: 100%;
        appearance: none;
        outline: none;
        font-size: 16px;
        line-height: 27px;
        margin: 10px 0 10px 16px;
        margin-left: 0;
        max-width: 500px;
        border: 1px solid ${COLORS.inputPlaceholder};
        padding: 0 5px;
        border-radius: 5px;
      }
    }

    .topic-chunk {
      display: flex;
      flex-direction: column;
      
      &__create-add-button {
        margin-top: 24px;      
      }
      
      &__block {
        display: flex;
        flex-direction: column;
        &-label {
          font-size: 14px;
          line-height: 16px;
          color: ${COLORS.black};
          margin-top: 10px;
        }
        &-search {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 8px;
          margin-left: 16px;
          @media only screen and (max-width: 767px) {
            margin-left: 18px;
          }
          &-input {
            max-width: 552px;
            appearance: none;
            outline: none;
            font-size: 16px;
            line-height: 27px;
            color: ${COLORS.greyInput};
            margin-left: 18px;
            border: 1px solid ${COLORS.inputPlaceholder};
            padding: 0 5px;
            border-radius: 5px;
            &_error {
              border: 1px solid ${COLORS.redFlamingo};
            }
          }
          &-list {
            margin-top: 15px;
            display: flex;
            flex-direction: column;
            border: 1px solid ${COLORS.greyInput};
            border-radius: 4px;
            background: ${COLORS.white};
            overflow: auto;
            max-height: 120px;
            width: 100%;
            
            &-item {
              margin: 5px 16px;
              font-size: 15px;
              line-height: 28px;
              color: ${COLORS.black};
              height: 30px;
              cursor: pointer;
              
              &_active {
                background-color: ${COLORS.greyBack};
              }
            }
          }
        }
      }
      &__create {
        display: flex;
        flex-direction: column;
        &-label {
          font-size: 14px;
          line-height: 16px;
          color: ${COLORS.black};
          margin-top: 10px;
        }
        &-input {
          max-width: 552px;
          appearance: none;
          border: none;
          outline: none;
          margin-left: 18px;
          font-size: 16px;
          line-height: 27px;
          color: ${COLORS.greyInput};
          margin: 10px 0 10px 16px;
          border: 1px solid ${COLORS.inputPlaceholder};
          padding: 0 5px;
          border-radius: 5px;
          &_error {
            border: 1px solid ${COLORS.redFlamingo};
          }
        }
        &-description {
          display: flex;
          flex-direction: column;
          &-label {
            font-size: 14px;
            line-height: 16px;
            color: ${COLORS.black};
            margin-bottom: -25px;
            @media only screen and (max-width: 767px) {
              margin-bottom: -10px;
            }
          }
        }
        &-add {
          display: flex;
          justify-content: flex-end;
        }
        &-textformat {
          max-width: 552px;
          margin-left: 16px;
        }
      }
      &__btn-save {
        display: flex;
        justify-content: center;
      }
    }

    .drag-n-drop-block {
      margin: 20px;

      &__title {
        font-weight: 500;
        font-size: 20px;
        color: ${COLORS.black};
        margin-bottom: 15px;
      }
    }
`;

export default WithDirection(EditTopicWrapper);
