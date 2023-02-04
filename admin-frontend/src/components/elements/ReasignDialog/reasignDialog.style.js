import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const ReasignDialogWrapper = styled.div`
  .reasign-dialog {
    &__title {
      font-size: 24px;
      color: ${COLORS.black};
    }
    &__title-select {
      font-size: 12px;
      margin-top: 30px;
    }
    &__select {
      margin-top: 10px;
    }

    &__text {
      margin-top: 15px;
      font-size: 16px;
      color: ${COLORS.black};
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

export default WithDirection(ReasignDialogWrapper);
