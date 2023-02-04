import styled from 'styled-components';
import WithDirection from '../../../settings/withDirection';
import { COLORS } from 'constants/constants';

const CircleProgressWrapper = styled.div`
  
  .ant-progress-inner {
    width: 25px!important;
    height: 27px!important;
  }
  
  .ant-progress-circle-path {
    stroke: ${COLORS.green}!important;
    stroke-width: 24px;
  }
  
  .ant-progress-circle-trail {
    stroke: ${COLORS.greyOrgBorder};
    stroke-width: 6px;
}
`;

export default WithDirection(CircleProgressWrapper);
