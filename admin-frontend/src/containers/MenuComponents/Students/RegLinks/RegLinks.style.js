import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const RegLinksWrapper = styled.div`
  .reg-links {
    background-color: ${COLORS.greyInput};
  }
  
  .title {
    display: flex;
    flex-direction: column;
    width: 100%;
    @media only screen and (max-width: 767px) {
      margin-left: 16px;
    }
    &__title {
      font-weight: normal;
      font-size: 24px;
      font-weight: 500;
      line-height: 28px;
      color: ${COLORS.black};
      margin: 15px 0;
    }
    &__item {
      font-weight: normal;
      font-size: 16px;
      line-height: 28px;
      color: ${COLORS.black};
      margin-bottom: 15px;
      &-row {
        display: flex;
        flex-direction: row;
      }
      &-list {
        flex: 1;
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
        margin-top: 16px;
        margin-left: 20px;
        color: ${COLORS.black};
        @media only screen and (max-width: 767px) {
          margin-left: 0; 
        }
      }
    }
    
    &__icon {
      width: 20px;
      height: 20px;
      transform: rotate(180deg);
      fill: ${COLORS.black};
      margin-top: 3px;
      margin-left: 15px;
      @media only screen and (max-width: 767px) {
        margin: 0 10px; 
      }
    }
    
    &__hidden {
      @media only screen and (max-width: 767px) {
        display: none;
      }
    }
  }

  .reglink-table {
    max-width: 1200px;
    margin-top: 20px;

    th {
      padding: 5px 10px;
    }

    &__header {
      background-color: #D4D4D4;
      color: black;
      font-size: 16px;
    }

    &__row:nth-child(2n) {
      background-color: #f5f5f5;
    }

    &__col {
      &-label-container {
        margin: 20px;
      }
      &-label {
        font-weight: bold;
      }
    }
  }

  .reglink-item {
    display: flex;
    flex-direction: column;

    &__thin {
      font-weight: 400;
      font-size: 13px;
    }

    &__check-box {
      margin: 0 auto;
      width: min-content;
      cursor: pointer;

      .title {
        margin: 0;
      }
    }

    &__link {
      cursor: pointer;
      border: none;
      background-color: unset;
      text-align: start;
    }

    &__delete-button {
      margin: 0 auto;
      width: 100%;
      cursor: pointer;
      border: none;
      background: unset;
    }

    &__courses-name {
      display: flex;
      flex-direction: column;
      color: black;
      font-weight: 600;
    }

    &__grup {
      display: flex;
      flex-direction: column;
    }

    &__link {

    }
  }
  
  .course {
    margin-top: 30px;
    
    &__button {
      display: flex;
      margin-top: 10px;
      
    &-add {
      height: 40px;
      min-width: 140px;
      color: ${COLORS.black};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      background-color: ${COLORS.grayAlto};
      border-radius: 4px;
      border: none;
      outline: none;
      }
    }
  }
  
  .link {
    margin-top: 30px;
  }
  
  .page {
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
      margin-right: 8px;
    }
    &__right {
      flex: 1;
      margin-left: 8px;   
      margin-right: 16px;
      @media only screen and (max-width: 767px) {
        margin-left: 0;
        margin-top: 20px;
      }  
    }
  }
`;

export default WithDirection(RegLinksWrapper);
