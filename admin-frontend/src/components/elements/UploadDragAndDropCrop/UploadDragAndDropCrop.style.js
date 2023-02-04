import styled from 'styled-components';
import { COLORS } from 'constants/constants';
import WithDirection from 'settings/withDirection';

const UploadDragAndDropCropWrapper = styled.div`
  max-width: 568px;
  .title {
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: ${COLORS.black};
  }
  .drag-and-drop {
    position: relative;
    display: flex;
    flex: 1;
    min-height: 235px;
    justify-content: center;
    align-items: center;
    max-width: 568px;
    background-color: ${COLORS.greyBGElement};
    margin-top: 16px;
    
    &__download-image {
      position: absolute;
      max-width: 568px;
      height: 235px;
      z-index: 0;
    }
    
    &__main-select {
      cursor: pointer;
    }
    
    &__main {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: ${COLORS.black};
      font-size: 12px;
      line-height: 27px;
      &-select {
        position: relative;
        background-color: ${COLORS.grayAlto};
        width: 140px;
        height: 40px;
        border-radius: 4px;
        margin-top: 10px;
      }
      &-input {
        visibility: hidden;
      }
      &-btn {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        height: 100%;
        width: 100%;
        cursor: pointer;
      }
    }
    &__error {
      color: ${COLORS.redFlamingo};
    }
  }
  .crop {    
    &__cropped {
      margin-top: 30px;
      margin-bottom: 7px;
      max-width: 568px;
      max-height: 568px;
    }
    
    &__btn {
      width: 100%;
    
      &-crop {
        border: 0;
        height: 40px;
        min-width: 140px;
        width: auto;
        font-weight: bold;
        background-color: ${COLORS.defaultButtonColor};
        border-radius: 4px;
        margin-right: 20px;
        
        &:disabled {
          opacity: 0.5;
        }
      }
      
      &-delete {
        border: 0;
        height: 40px;
        min-width: 140px;
        width: auto;
        font-weight: bold;
        font-size: 14px;
        background-color: ${COLORS.redPomegranate};
        color: ${COLORS.white};
        border-radius: 4px;
      }
      
      &-upload {
        width: 140px;
        height: 40px;
        margin-top: 30px;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: ${COLORS.black};
        &_display-none {
          display: none;
        }
      }
    } 
  }
`;

export default WithDirection(UploadDragAndDropCropWrapper);
