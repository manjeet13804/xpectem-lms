import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const EditHeaderDialogWrapper = styled.div`
  .edit-header-dialog {
    &__title {
      font-size: 24px;
      color: ${COLORS.black};
    }

    &__input {
      margin-top: 50px;
      &-title {
        font-size: 12px;
        margin-bottom: 10px;
      }
    }

    &__button {
      display: flex;
      justify-content: flex-end;
      margin-top: 80px;

      &-btn {
        cursor: pointer;
        width: 120px;
        height: 40px;
        font-weight: 500;
        font-size: 14px;
        background-color: ${COLORS.greyButton};
        color: ${COLORS.black};
        border-radius: 2px;
        outline: none;
        border: none;
      }
    }    
  }
`;

export default WithDirection(EditHeaderDialogWrapper);
