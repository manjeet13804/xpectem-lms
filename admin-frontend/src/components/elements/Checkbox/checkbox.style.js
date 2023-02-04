import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const CheckboxWrapper = styled.div`
  .checkbox-block {
    display: flex;
    flex-direction: row;
    height: 32px;
    align-items: center;
    outline: none;
  }
  .clear-checkbox {
    min-width: 18px;
    min-height: 18px;
    border: 1px solid ${COLORS.black};
    cursor: pointer;
  }
  .title {
    margin-left: 10px;
    cursor: pointer;
  }
  .icon {
    min-width: 18px;
    min-height: 18px;
  }
`;

export default WithDirection(CheckboxWrapper);
