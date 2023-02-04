import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const CourseProfileWrapper = styled.div`
  .course-profile {
    margin-top: 16px;
    width: 100%;
    &__title {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      letter-spacing: 0.4px;
      color: ${COLORS.black};
    }
    &__item {
      margin-top: 6px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    &__item-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__item-data {
      margin-left: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }  
  }
`;

export default WithDirection(CourseProfileWrapper);
