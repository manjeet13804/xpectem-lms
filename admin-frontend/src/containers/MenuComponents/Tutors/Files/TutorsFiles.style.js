import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const TutorsFilesWrapper = styled.div`
  .page {  
    &__modal {
      min-width: 751px !important;
    }
    
    &__title {
      font-size: 16px;
      line-height: 28px;
      color: ${COLORS.black};
      display: flex;
      align-items: center;
    }
    
    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 16px;
      height: 40px;
      border-radius: 4px;
      background-color: ${COLORS.grayAlto};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: ${COLORS.black};
      outline: none;
      margin-top: 25px;
      border: none;
      cursor: pointer;
      letter-spacing: 0.75px;
      opacity: 0.87;
      min-width: 140px;
      
      &_disabled {
        background-color: ${COLORS.greyBack};
        border: none;
        color: ${COLORS.grayBoulder};
      }
    }
    
    &__content {
      margin-top: 82px;
    }
    
    &__folder {
      height: 48px;
      overflow: hidden;
      border: 1px solid ${COLORS.greyBack};
      width: 100%;
      max-width: 812px;
      margin-bottom: 12px;
      cursor: pointer;
      
      &_is-open {
        height: 100%;
      }
      
      &-header {
        display: flex;
        padding-left: 22px;
        padding-top: 10px;
        padding-right: 30px;
        margin-bottom: 30px;
        justify-content: space-between;
      }
      
      &-name {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 28px;
      }
      
      &-toggle {
        position: relative;
        background-color: transparent;
        outline: none;
        border: none;
        cursor: pointer;
      }
      
      &-toggle-gray-line {
        position: absolute;
        width: 15px;
        height: 2px;
        background-color: ${COLORS.black};
        top: 50%;
        left: 50%; 
        
        &_second {
          transform: rotate(90deg);
        }
        
        &_is-open {
          transform: rotate(0deg) !important;
        }
      }
      
      &-footer {
        display: flex;
        flex-direction: row-reverse;
        margin-right: 35px;
        margin-top: 35px;
        margin-bottom: 50px;
      }
      
      &-content {
        padding: 0 43px 0 52px;
      }
    }

    &__files {
      width: 100%;
      max-width: 812px;
      padding: 0 43px 0 52px;
    }

    &__create-folder,
    &__popup-file {
      padding: 0 90px;
     
      &-content {
        margin-top: 38px;
        margin-bottom: 59px;
      }
      
      &-title {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.black};
      }
      
      &-input {
        border: none;
        outline: none;
        padding: 8px;
      }

      &-input-title {
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
        letter-spacing: 0.4px;
        color: ${COLORS.black}
      }
      
      &-footer {
        display:flex;
        justify-content: center;
        margin-bottom: 51px;
      }
    }    
  }
`;

export default WithDirection(TutorsFilesWrapper);
