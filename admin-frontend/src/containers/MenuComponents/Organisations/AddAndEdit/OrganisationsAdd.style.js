import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const OrganisationsAddWrapper = styled.div`
  .page {
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-right: 16px;
    &_transparent {
      opacity: 0.3;
      pointer-events: none;
    }
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
      margin-left: 4px;
      margin-top: 45px;
      display: flex;
      flex-direction: column;
    }
  }
  
  .group {    
    &__title {
      font-size: 16px;
      line-height: 28px;
      color: ${COLORS.black};
      margin-left: 16px;
    }
    
    &__name {
      font-size: 12px;
      line-height: 16px;
      color: ${COLORS.black};
      margin-top: 16px;
      max-width: 568px;
      width: 100%;
      
      &-input {
        width: 100%;
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.greyInput};
        border: none;
        outline: none;
        margin-top: 14px;
        margin-left: 8px;
      }
    }
    &__optional {
      font-size: 12px;
      line-height: 16px;
      margin-top: 14px;
      color: ${COLORS.black};
    }
    &__checkbox {
      margin-top: 18px;
    }
  }
  .main-title {
    display: flex;
    flex-direction: column;
    &__welcome {
      margin-top: 44px;
      font-size: 24px;
      line-height: 28px;
      color: ${COLORS.black};
    }
    &__override {
      font-size: 16px;
      line-height: 28px;
      color: ${COLORS.black};
      margin-top: 8px;
    }
    &__logotype {
      margin-top: 16px;
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      color: ${COLORS.black};
    }
    &__shown  {
      font-size: 16px;
      line-height: 28px;
      color: ${COLORS.black};
      margin-top: 8px;
      margin-bottom: 16px;
    }
  }
  .welcome-text__admin {
    font-size: 12px;
    line-height: 16px;
    color: ${COLORS.black};
    margin: 16px 0 13px 0;
  }
  .welcome-text__student {
    font-size: 12px;
    line-height: 16px;
    color: ${COLORS.black};
    margin: 16px 0 13px 0;
  }
  .button {
    display: flex;
    justify-content: flex-end;
    margin-top: 32px;
    align-items: center;
    
    &__add {
      border: 0;
      height: 40px;
      min-width: 140px;
      width: auto;
      font-weight: bold;
      background-color: ${COLORS.defaultButtonColor};
      border-radius: 4px;
      cursor: pointer;
        
     &:disabled {
       color: gray;
     }
    }
    
    &__loader {
        margin-right: 10px !important;
    }
    
    &__delete {
      background-color: ${COLORS.redPomegranate};
      color: ${COLORS.white};
      margin-right: 24px;
      border: 0;
      height: 40px;
      min-width: 140px;
      width: auto;
      font-weight: bold;
      border-radius: 4px;
      cursor: pointer;
    }
  }
`;

export default WithDirection(OrganisationsAddWrapper);
