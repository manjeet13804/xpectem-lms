import styled from 'styled-components';
import { COLORS } from 'constants/constants';
import WithDirection from '../../../settings/withDirection';

const AdminSelectWrapper = styled.div`
  .ant-select-selection {
    &:hover, &:active, &:focus {
      border: 1px solid ${COLORS.grayBorder};
    }
  }
`;

export default WithDirection(AdminSelectWrapper);
