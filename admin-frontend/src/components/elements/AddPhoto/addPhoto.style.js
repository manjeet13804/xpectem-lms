import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const AddPhotoWrapper = styled.div`
  .text-attach {
    display: flex;
    flex-direction: column;
    &__welcome {
      font-size: 16px;
      line-height: 28px;
    }
    &__requirements {
      margin-top: 8px;
      width: 100px;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.4px;
    }
  }

  .add-profile-photo {
    width: 100%;
    height: 235px;
    margin-top: 8px;
    background-color: ${COLORS.greyOrg};
  }
  
  .content {
    &__upload-zone {
        margin: 10px auto 30px;
        width: 100%;
        height: 235px;
        position: relative;
        cursor: pointer;
        background-color: ${COLORS.grayMercury};
        border: 1px dashed ${COLORS.grayDusty};
      }
    
    &__input-drop {
      width: 100%;
      opacity: 0;
      cursor: pointer;
      height: 100%;
    }
    
    &__input-text-wrap {
        position: absolute;
        top: 50%;
        left:50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-self: center;
        margin: 0;
      }
    
    &__input-text {
        font-size: 12px;
        line-height: 27px;
        color: ${COLORS.grayMineShaft};
        text-align: center;
      }
    
    &__button {
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: ${COLORS.grayMineShaft};
        letter-spacing: 0.75px;
        background-color: ${COLORS.grayAlto};
        border-radius: 2px;
        text-transform: uppercase;
        padding: 8px 18px;
      }
    
    &__btn-close {
        padding: 0;
        border: none;
        position: absolute;
        top: 9px;
        right: 8px;
        outline: none;
      }
    
    &__crop-block {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    
    &__photo-wrap {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    
    &__btn {
        width: 167px;
        padding-top: 11px;
        padding-bottom: 11px;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: ${COLORS.grayMineShaft};
        letter-spacing: 0.75px;
        background-color: ${COLORS.grayAlto};
        border-radius: 2px;
        text-transform: uppercase;
        text-align: center;
        margin-top: 20px;
        align-self: flex-end;
        outline: none;
      }
    
    &__cropped-image {
        max-width: 100%;
        max-height: 300px;
      }
    
    &__error {
        color: ${COLORS.redFlamingo};
      }
    
    &__status {
        font-size: 13px;
        line-height: 20px;
        color: ${COLORS.grayMineShaft};
        margin: 10px 0;
        align-self: flex-start;
      }
    }
`;

export default WithDirection(AddPhotoWrapper);