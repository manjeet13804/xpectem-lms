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

    &_is-close-preview {
      height: unset;
    }

    &__main {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: ${COLORS.black};
      font-size: 12px;
      line-height: 27px;

      &_is-close-preview {
        flex-direction: row;
        margin: 10px 0;
      }

      &-select {
        cursor: pointer;
        position: relative;
        background-color: ${COLORS.grayAlto};
        width: 140px;
        height: 40px;
        border-radius: 4px;
        margin-top: 10px;

        &_is-close-preview {
          margin-top: 0;
          cursor: pointer;
        }
      }
      &-input {
        visibility: hidden;
      }
      &-btn {
        cursor: pointer;
        position: absolute;
        width: 100%;
        height: 100%;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &-or {
        &_is-close-preview {
          margin: 0 20px;
        }
      }
    }
  }

  .hbs-preview {
    padding: 15px 10px;
    border: 1px solid ${COLORS.seashell};
    max-height: 500px;
    overflow: auto;
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
  .error {
    color: ${COLORS.redFlamingo}
  }
`;

export default WithDirection(DragAndDropWrapper);
