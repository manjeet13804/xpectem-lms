import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const CourseItemWrapper = styled.div`
  .course-item {
    width: 100%;
    margin-top: 2px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 16px;
    padding-top: 8px;
    overflow: hidden;
    border: 1px solid ${COLORS.grayDashed};
    background-color: ${COLORS.white};

    &:nth-child(2n) {
      background-color: ${COLORS.grayWild};
    }
    
    &_is-white {
      background-color: ${COLORS.grayWild};
    }

    &__text {
      display: flex;
      flex-direction: column;
      margin-bottom: 6px;
    }
    
    &__title {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      margin-bottom: 15px;
      &-text {
        font-size: 16px;
        color: ${COLORS.black};
        cursor: pointer;
      }
      
      &-icon {
        width: 20px;
        height: 20px;
        transform: rotate(180deg);
        fill: ${COLORS.black};
        margin-right: 11px;
        cursor: pointer;
      }
    }
    
    &__option {
      font-size: 14px;
      color: ${COLORS.grayDove};
      margin-bottom: 5px;
      &:before {
        content: '- ';
      }
    }
  }  
`;

export default WithDirection(CourseItemWrapper);
