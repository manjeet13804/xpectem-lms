import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const AddNewTopicPopupWrapper = styled.div`
    .popup {
        position: fixed;
        top: -100%;
        right: -100%;
        left: -100%;
        background: rgba(0,0,0,0.5);
        z-index: 1;
        transition: all .5s ease-in;
        &_close {
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        &__wrap {
            padding: 24px 27px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            min-width: 605px;
            min-height: 231px;
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
            position: absolute;
            top: 13px;
            right: 15px;
            cursor: pointer;
            @media only screen and (max-width: 767px) {
              margin: 10px 10px 0 0;
            }
        }
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
`;

export default WithDirection(AddNewTopicPopupWrapper);
