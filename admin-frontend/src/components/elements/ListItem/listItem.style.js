import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const ListItemWrapper = styled.div`
  .item {
    display: flex;
    color: ${COLORS.black};
    flex-direction: row;
    background: ${COLORS.grayAlto};
    border: 1px solid ${COLORS.greyContrast};
    box-sizing: border-box;
    border-radius: 2px;
    padding-left: 8px;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    &__controls {
      width: 110px;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 24px;
      justify-content: flex-end;
    }
    &__icon-wrapper {
      margin-right: 5px;
      cursor: pointer;
      &_delete {
        font-size: 18px;
        line-height: 24px;
        text-align: center;
        font-weight: bold;
        height: 24px;
        width: 24px;
        border: 1px dashed ${COLORS.greyContrast};
        margin: 2px;
        cursor: pointer;
      }
    }
  }
`;

export default WithDirection(ListItemWrapper);
