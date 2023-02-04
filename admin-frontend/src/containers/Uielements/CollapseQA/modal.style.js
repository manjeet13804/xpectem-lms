import styled from 'styled-components';
import { COLORS } from 'constants/constants';
import WithDirection from '../../../settings/withDirection';

const ModalQAWrapper = styled.div`
  .modal {
    background-color: ${COLORS.redFlamingo};
  }
`;

export default WithDirection(ModalQAWrapper);
