import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const EditFileDialogWrapper = styled.div`
  .edit-file-dialog {
    &__search-input {
      .ui.input {
        width: 100%;
        
        input {
          border-radius: 4px;
        }
      }
    }
    &__title {
      font-size: 24px;
      color: ${COLORS.black};
    }

    &__input {
      margin-top: 30px;
      &-title {
        font-size: 12px;
        margin-bottom: 10px;
      }
    }

    &__button {
      display: flex;
      justify-content: center;
      margin-top: 30px;

      &-btn {
        width: 120px;
        height: 40px;
        font-weight: 500;
        font-size: 14px;
        background-color: ${COLORS.greyButton};
        color: ${COLORS.black};
        border-radius: 2px;
        outline: none;
        border: none;
        &_red {
          background-color: ${COLORS.redPomegranate};
          margin-right: 23px;
        }
      }
    }    
  }
`;

export default WithDirection(EditFileDialogWrapper);
