import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const DragAndDropCustomizeWrapper = styled.div`
  .drag-and-drop {
    width: 550px;
    @media only screen and (max-width: 560px) {
      width: 100%;
    }
    &__param {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      letter-spacing: 0.4px;
      color: ${COLORS.black};
      mix-blend-mode: normal;
      opacity: 0.87;
    }
    &__main {
      margin-top: 9px;
      height: 147px;
      background: ${COLORS.greyBGElement};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &_error {
        border: 1px solid ${COLORS.redPomegranate};
      }
      &_dashed {
        border: 1px dashed ${COLORS.grayDashed};
      }
    }
    &__select {
      position: relative;
      background: rgba(206, 206, 206, 0.87);
      border-radius: 4px;
      width: 140px;
      height: 40px;
      cursor: pointer;
    }
    &__input {
      visibility: hidden;
    }
    &__title-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
      text-align: center;
      cursor: pointer;
      color: ${COLORS.black};
    }
    &__item-file {
      width: 100%
      height: 50px;
    }
    &__item-file-name {
      margin-top: 13px;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      letter-spacing: 0.4px;
      color: ${COLORS.black};
    }
    &__item-file-size {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      letter-spacing: 0.4px;
      color: ${COLORS.black};
    }
  }
`;

export default WithDirection(DragAndDropCustomizeWrapper);
