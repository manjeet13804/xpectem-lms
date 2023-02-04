import styled from 'styled-components';
import { COLORS } from 'constants/constants';
import WithDirection from 'settings/withDirection';
import { transition, borderRadius, boxShadow } from '../../../settings/style-util';

const DragAndDropWrapper = styled.div`

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
    display: flex;
    flex: 1;
    min-height: 235px;
    max-height: 281px;
    justify-content: center;
    align-items: center;
    max-width: 568px;
    background-color: ${COLORS.greyBGElement};
    margin-top: 16px;
    &_dashed {
      border: 2px dashed ${COLORS.grayDashed};
    }
    &_error {
      ${transition()}
      ${boxShadow()}
      border: 1px solid ${COLORS.redPomegranate};
      ${borderRadius('3px')};
    }
    &_file {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      background-color: ${COLORS.white};
    }
    &__img {
      display: block;
      align-items: center;
      max-width: 220px;
      max-height: 220px;
    }
    &__main {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: ${COLORS.black};
      font-size: 12px;
      line-height: 27px;
      &_file {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        flex-direction: row;
        align-items: center;
        background-color: ${COLORS.greyBGElement};
      }
    }
    &__or {
      &_file {
        margin: 0 15px 0 3px;
      }
    }
    &__select {
      position: relative;
      background-color: ${COLORS.grayAlto};
      width: 140px;
      height: 40px;
      border-radius: 4px;
      margin-top: 10px;
      &_file {
        margin: 0;
      }
    }
    &__file {
      width: 300px;
      display: flex;
      justify-content: flex-end;
    }
    &__input {
      visibility: hidden;
    }
    &__btn {
      position: absolute;
      margin-top: 10px;
      margin-left: 30px;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
    }
    
  }
`;

export default WithDirection(DragAndDropWrapper);
