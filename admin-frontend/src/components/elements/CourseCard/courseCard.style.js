import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const CourseCard = styled.div`
  .course-card {
     color: ${COLORS.black};
    &__title {
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      letter-spacing: 0.15px;
      margin-top: 10px;
      margin-bottom: 10px;
      &-main {
        font-weight: normal;
        font-size: 24px;
        line-height: 28px;
        margin-bottom: 10px;
      }
    }
    
    &__text {
      font-weight: normal;
      font-size: 16px;
      line-height: 28px;
      &-info {
        margin: 10px;
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        display: flex;
        align-items: center;
        letter-spacing: 0.75px;
        text-transform: capitalize;
      }
    }
    
    &__option {
      font-size: 14px;
      margin-bottom: 5px;
      &:before {
        content: '- ';
      }
    }
  }
`;

export default WithDirection(CourseCard);
