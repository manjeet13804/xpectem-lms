import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';
import { transition, borderRadius, boxShadow } from '../../../../settings/style-util';

const TutorsEditWrapper = styled.div`
  .page {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 0 16px;
    &__title {
      font-size: 16px;
      line-height: 28px;
      margin-bottom: 12px;
    }

    .form {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 12px;
      @media only screen and (max-width: 767px) {
        display: flex;
        flex-direction: column; 
      }
      
      &__left {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      &__right {
        margin-left: 41px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @media only screen and (max-width: 767px) {
          margin: 0;
        }
      }
      &__label {
        max-width: 516px;
        width: 100%;
        margin-top: 15px;
        display: flex;
        flex-direction: column;
      }
      &__title {
        font-size: 12px;
        line-height: 16px;
        color: ${COLORS.black};
        &_notification {
          font-size: 16px;
          line-height: 28px;
        }
        &_courses {
          font-weight: 500;
          font-size: 20px;
          line-height: 23px;
        }
      }
      &__input {
        margin-top: 7px;
        margin-left: 16px;
        padding-left: 5px;
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.greyInput};
        outline: none;
        border: none;
        &_error {
          ${transition()}
          ${boxShadow()}
          border: 1px solid ${COLORS.redPomegranate};
          ${borderRadius('3px')};
        }
      }
      &__notification {
        margin-top: 10px;
        font-size: 12px;
        line-height: 16px;
        color: ${COLORS.black};
      }
      &__checkbox-group {
        display: flex;
        flex-direction: column;
        margin-top: 9px;
        padding-left: 10px;
      }
      &__btn-wrap {
        margin-top: 372px;
        width: 289px;
        display: flex;
        justify-content: space-between;
        align-self: flex-end;
        @media only screen and (max-width: 767px) {
          margin-top: 20px;
          align-self: center;
        }
      }
      &__button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 6px;
        margin-right: 20px;
        width: 246px;
        height: 40px;
        border-radius: 4px;
        background-color: ${COLORS.grayAlto};
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: ${COLORS.black};
        outline: none;
        &_disabled {
          border: none;
          color: ${COLORS.grayBoulder};
        }
        &_save {
          align-self: flex-end;
          width: 120px;
          height: 40px;
          margin: 0;
        }
        &_delete {
          background-color: ${COLORS.red};
          align-self: flex-end;
          width: 120px;
          height: 40px;
          margin: 0;
        } 
      }
      &__courses {
        font-size: 16px;
        line-height: 28px;
        margin-top: 36px;
        max-width: 391px;
        @media only screen and (max-width: 560px) {
          font-size: 13px;
        }
      }
      &__tutor-info {
        width: 550px;
        height: 293px;
        background: ${COLORS.grayMercury};
      }
      &__courses-info {
        @media only screen and (max-width: 560px) {
          font-size: 14px;
        }
      }
    .course-fields {
      margin-top: 25px;
      &__label {
        font-size: 12px;
        line-height: 16px;
        color: ${COLORS.black};
      }
    }
  }
`;

export default WithDirection(TutorsEditWrapper);
