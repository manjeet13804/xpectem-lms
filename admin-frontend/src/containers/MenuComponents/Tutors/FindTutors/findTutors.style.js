import { COLORS } from 'constants/constants';
import WithDirection from 'settings/withDirection';
import styled from 'styled-components';

const TutorsFindWrapper = styled.div`
  .page {

    &__not-found {
      height: 100%;
      width: 100%;
      font-size: 30px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      max-height: 400px;
      color: ${COLORS.silverLighter};
    }
    
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-right: 16px;
     @media only screen and (max-width: 767px) {
       display: flex;
       flex-direction: column;
       margin-left: 16px;
     }
    
    &__left {
      flex: 1;
      margin-right: 4px;
    }
    &__right {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
  
  .button {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
    &__search {
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
  
  .tutor-find {
    margin-left: 8px;
    &__title {
      font-size: 16px;
      color: ${COLORS.black};
      margin-top: 10px;

      &-found {
        font-weight: 500;
        font-size: 20px;
        color: ${COLORS.black};
        margin-top: 40px;
      }
    }
    &__input {
      display: flex;
      flex-direction: column;
      margin-top: 25px;
      &-title {
        font-size: 12px;
        letter-spacing: 0.4px;
        color: ${COLORS.black};
      }
      &-block {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 8px;
        margin-left: 14px;
        border: 1px solid ${COLORS.inputPlaceholder};
        padding: 0 5px;
        border-radius: 5px;
      }
      &-text {
        font-size: 16px;
        width: 100%;
        appearance: none;
        border: none;
        outline: none;
      }
      &-checkbox {
        margin-top: 16px;
      }
      &-button {
        display: flex;
        justify-content: flex-end;
        margin-top: 16px;
        margin-right: 20px;
        &-search {
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
    }
  }
`;

export default WithDirection(TutorsFindWrapper);
