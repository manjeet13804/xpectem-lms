import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const TextFormatSimpleWrapper = styled.div`
  width: 100%;
  max-width: 581px;
  display: flex;
  flex-direction: column;
  
  .title {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    color: ${COLORS.black};
    font-size: 12px;
    line-height: 16px;
    margin-top: 10px;
    
    &__text {
      width: 160px;
      padding-left: 10px;
    }
    
    &__language {
      width: 160px;
    }
  }
  
  .elements {
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    
    &__text-type {
      display: flex;
      justify-content: space-between;
      
      &__bold {
        width: 36px;
        height: 36px;
        background-color: ${COLORS.greyBGElement};
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      &__cursive {
        width: 36px;
        height: 36px;
        background-color: ${COLORS.greyBGElement};
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 4px;
      }
    }
    
    &__text-position {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 92px;
      height: 36px;
      background-color: ${COLORS.greyBGElement};
      margin-left: 4px;
      align-items: center;
    }
    
     &__text-list {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 64px;
      height: 36px;
      background-color: ${COLORS.greyBGElement};
      margin-left: 4px;
    }
    
    &__select-paragraph {
      margin-left: 4px;
    }
    
    &__select-language {
      margin-left: 4px;
      visibility: hidden;
    }
  }
  
  .textarea {
    margin-top: 4px; 
    
    &__input {
      width: 100%;
      height: 166px;
      padding: 12px;
      border: 1px solid ${COLORS.grayAlto};
      border-radius: 4px;
      outline: none;
      font-size: 16px;
      line-height: 28px;
      color: ${COLORS.grayDove};
      &_error {
        border: 1px solid ${COLORS.redFlamingo};
      }
    }
  }
`;

export default WithDirection(TextFormatSimpleWrapper);
