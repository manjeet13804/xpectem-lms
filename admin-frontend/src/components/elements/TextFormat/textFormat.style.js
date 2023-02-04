import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const TextFormatWrapper = styled.div`
  width: 100%;
  max-width: 568px;
  display: flex;
  flex-direction: column;
  
  .textarea {
    &__text-wrapper {
      color: ${COLORS.black};
    }
  }
  
  .rdw-editor-toolbar {
    margin-bottom: 0;
    border: 0;
    padding: 0;
  }
  
  .rdw-editor-main {
    border: 1px solid #F1F1F1;
    padding: 10px;
    min-height: 215px;
  }
  
  .title {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    color: ${COLORS.black};
    font-size: 12px;
    line-height: 16px;
    margin-top: 10px;
  }
  .elements {
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    
    &__selects {
      margin-bottom: 6px;
      display: flex;
    }
    
    &__wrap-select {
      position: relative;
    }
    
    &__text {
      font-size: 12px;
      position: absolute;
      top: -22px;
      
     @media only screen and (max-width: 1409px) {
       position: unset;
     }
    }
    &__language {
      font-size: 12px;
      position: absolute;
      top: -22px;
      
      @media only screen and (max-width: 1409px) {
       position: unset;
      }
    }
    
     &__selects {
      display: flex;
     }
     
     &__block-type {
       span {
          color: gray;
       }
     }
   
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
      &__left {
      
      }
      &__center {
      
      }
      &__right {
      
      }
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
      margin-right: 4px;
      width: 160px !important;
    }
    &__select-language {
      margin-left: 4px;
      right: 5px;
      width: 150px !important;
    }
  }
  
  .textarea {
    position: relative;
    margin-top: 4px;
    color: #5f5f5f;
    font-size: 14px;
    
    .rdw-block-wrapper {
      margin-right: 195px;
    }
    
    &__input {
      width: 100%;
      height: 166px;
      padding: 12px;
      border: 1px solid ${COLORS.grayAlto};
      border-radius: 4px;
      outline: none;
      font-size: 16px;
      line-height: 28px;
    }
    &__error {
      color: ${COLORS.redFlamingo};
    }
  }

  .button {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
    @media only screen and (max-width: 767px) {
      justify-content: center;
    }
    &__delete {
      background-color: ${COLORS.redPomegranate};
      color: ${COLORS.white};
      border: 0;
      height: 40px;
      min-width: 140px;
      width: auto;
      font-weight: bold;
      border-radius: 4px;
      max-width: 60px;
    }
  }
`;

export default WithDirection(TextFormatWrapper);
