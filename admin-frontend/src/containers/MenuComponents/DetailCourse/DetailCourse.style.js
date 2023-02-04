import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const DetailCourseWrapper = styled.div`
  .detail-course {
    background-color: ${COLORS.grey};
    
    @media only screen and (max-width: 767px) {
      &__component {
        margin: 0 16px;
      }
    }
  }
`;

export default WithDirection(DetailCourseWrapper);
