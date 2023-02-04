import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const SliderNumberWrapper = styled.div`
  background-color: ${COLORS.silver};
`;

export default WithDirection(SliderNumberWrapper);