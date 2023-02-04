import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const DraggableListWrapper = styled.div`
  .draggable-list {
    color: ${COLORS.grey};
  }
`;

export default WithDirection(DraggableListWrapper);
