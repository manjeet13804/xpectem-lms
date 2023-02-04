import styled from 'styled-components';
import { COLORS } from 'constants/constants';
import WithDirection from '../../../settings/withDirection';

const SubjectSelectWrapper = styled.div`
  .ant-select-selection {
    &:hover, &:active, &:focus {
      border: 1px solid ${COLORS.grayBorder};
    }
  }
`;

export default WithDirection(SubjectSelectWrapper);
