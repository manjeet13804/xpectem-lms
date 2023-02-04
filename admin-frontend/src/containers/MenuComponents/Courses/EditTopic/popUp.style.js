import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const PopupWrapper = styled.div`
    .popup {
      &__title {
        font-style: normal;
        font-weight: normal;
        font-size: 24px;
        mix-blend-mode: normal;
        opacity: 0.87;
        color: ${COLORS.black};
        @media only screen and (max-width: 767px) {
          font-size: 12px;
          margin-top: 20px;
        }
      }

      &__modal {
        min-width: 600px !important;
      }

      &__input-title {
        margin-top: 7px;
        font-size: 12px;
        color: ${COLORS.black};
      }
      &__input {
        font-size: 16px;
        width: 100%;
        height: 30px;
        appearance: none;
        border: none;
        outline: none;
        margin-left: 18px;
        color: ${COLORS.black};
      }
      &__button {
        cursor: pointer;
        margin-top: 32px;
        align-self: center;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 200px;
        height: 40px;
        border-radius: 4px;
        background-color: ${COLORS.grayAlto};
        font-weight: 500;
        font-size: 14px;
        color: ${COLORS.black};
        outline: none;
        text-transform: uppercase;
        &_delete {
          background-color: ${COLORS.guardsmanRed};
          align-self: flex-end;
        } 
      }
      &__new-topic {
        display: flex;
        align-items: center;
        padding-left: 8px;
        height: 60px;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        letter-spacing: 0.4px;
        color: ${COLORS.blueMercury};
        border-top: 1px solid ${COLORS.greyAlto};
        cursor: pointer;
        outline: none;
    }
  }

  .topic-chunk {
    display: flex;
    flex-direction: column;
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
        border: 1px solid ${COLORS.inputPlaceholder};
        padding: 0 5px;
        border-radius: 5px;
        @media only screen and (max-width: 767px) {
          margin-left: 18px;
        }
        &-input {
          width: 100%;
          appearance: none;
          border: none;
          outline: none;
          font-size: 16px;
          line-height: 27px;
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
        margin-top: 20px;
        &-button {
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 16px;
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
`;

export default WithDirection(PopupWrapper);
