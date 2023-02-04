import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const GroupsAddWrapper = styled.div`
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
      margin-top: 45px;
      margin-left: 4px;
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
      
      &-input {
        width: 100%;
        max-width: 560px;
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
  
  .button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 32px;
    &__add {
      width: 140px;
      height: 40px;
      border-radius: 4px;
      background-color: ${COLORS.grayAlto};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: ${COLORS.black};
      outline: none;
      
      &:disabled {
        color: gray;
      }
    }
    
    &__loader {
      margin-right: 10px !important;
    }
    
    &__delete {
      width: 140px;
      height: 40px;
      border-radius: 4px;
      background-color: ${COLORS.redPomegranate};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: ${COLORS.white};
      margin-right: 24px;
      outline: none;
      
      &:disabled {
        opacity: 0.5;
      }
    }
  }
`;

export default WithDirection(GroupsAddWrapper);
