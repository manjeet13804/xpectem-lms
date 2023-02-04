import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const DeleteConfirmationPopupWrapper = styled.div`
    .popup {
        position: fixed;
        top: -100%;
        right: -100%;
        left: -100%;
        background: rgba(0,0,0,0.5);
        z-index: 1000;
        transition: all .5s ease-in;
        &_close {
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        &__wrap {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 628px;
            min-height: 304px;
            background: ${COLORS.white};
            @media only screen and (max-width: 767px) {
              min-width: 400px;
              min-height: 150px;
            }
            @media only screen and (max-width: 560px) {
              min-width: 300px;
            }
        }
        &__img-wrap {
            margin: 23px 20px 0 0;
            align-self: flex-end;
            cursor: pointer;
            @media only screen and (max-width: 767px) {
              margin: 10px 10px 0 0;
            }
        }
        &__title {
          margin-top: 71px;
          font-size: 16px;
          color: ${COLORS.black};
          @media only screen and (max-width: 767px) {
            font-size: 12px;
            margin-top: 20px;
          }
        }
        &__btn-wrap {
            margin-top: 57px;
            width: 289px;
            display: flex;
            justify-content: space-between;
            @media only screen and (max-width: 767px) {
              margin-top: 20px;
              width: 260px;
            }
          }
          &__button {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 140px;
            min-height: 40px;
            border-radius: 4px;
            border: 1px solid gray;
            font-weight: 500;
            font-size: 14px;
            line-height: 16px;
            color: ${COLORS.black};
            outline: none;
            cursor: pointer;
            background-color: ${COLORS.colorBackGround};
            margin-right: 24px;

            &_delete {
              border: 0;
              background-color: ${COLORS.guardsmanRed};
              color: ${COLORS.white};
            }
          }
    }
`;

export default WithDirection(DeleteConfirmationPopupWrapper);
