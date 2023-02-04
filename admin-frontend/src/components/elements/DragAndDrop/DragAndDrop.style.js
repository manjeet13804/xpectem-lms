import styled from 'styled-components';
import { COLORS } from 'constants/constants';
import WithDirection from 'settings/withDirection';

const DragAndDropWrapper = styled.div`

  .title {
    display: flex;
    flex-direction: column;
    margin-top: 32px;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.4px;
    color: ${COLORS.black};

    &__file-name {
      font-weight: bold;
    }

  }
  .drag-and-drop {
    display: flex;
    flex: 1;
    height: 235px;
    justify-content: center;
    align-items: center;
    max-width: 568px;
    background-color: ${COLORS.greyBGElement};
    margin-top: 16px;
    &__main {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: ${COLORS.black};
      font-size: 12px;
      line-height: 27px;
      &-select {
        cursor: pointer;
        position: relative;
        background-color: ${COLORS.grayAlto};
        width: 140px;
        height: 40px;
        border-radius: 4px;
        margin-top: 10px;
        border: none;
        font-size: 14px;
      }
      &-input {
        visibility: hidden;
      }
      &-btn {
        position: absolute;
        cursor: pointer;
        padding: 10px 30px;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
      }
    }
  }
`;

export default WithDirection(DragAndDropWrapper);
