import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const TextFormatWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  
  .rdw-editor-toolbar {
    margin-bottom: 0;
    border-bottom: 0;
    border: 0;
  }
  
  .rdw-editor-main {
    border: 1px solid ${COLORS.seashell};
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

      &_lang {
        position: absolute;
        top: 6px;
        right: 0;
      }
    }
    
    &__wrap-select {
      position: relative;
    }
    
    &__text {
      font-size: 12px;
      position: absolute;
      top: -22px;
      height: 16px;
      
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
          color: ${COLORS.gray};
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
    max-width: 568px;

    &__header {
      &_is-message {
        font-size: 14px;
        color: ${COLORS.greyInput};
      }
    }
    &_is-message {
      max-width: unset;
      background-color: ${COLORS.white};
    }

    &_is-reply {
      border: 1px solid ${COLORS.grayBorder};
      border-radius: 4px;
    }
    
    .rdw-block-wrapper {
      margin-right: 195px;
    }
    
    &__editor {
      color: ${COLORS.black};
      
      &_is-message {
        border: 1px solid ${COLORS.grayBorder};
        border-radius: 4px;
      }

      &_is-reply {
        border: none;
        border-radius: none;
        border-top: 1px solid ${COLORS.grayBorder};
      }

      &_error {
        border: 1px solid ${COLORS.redFlamingo};
      }
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
      color: ${COLORS.greyInput}
    }
    &__error {
      color: ${COLORS.redFlamingo};
    }
  }
`;

export default WithDirection(TextFormatWrapper);
