import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const CourseItemEditWrapper = styled.div`
  .course-item {
    background-color: ${COLORS.grayWild};
    width: 100%;
    margin-top: 2px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-left: 16px;
    padding-top: 8px;
    overflow: hidden;
    padding-right: 16px;
    
    &_passed {
      background-color: ${COLORS.white};
    }
    
    &__text {
      display: flex;
      flex-direction: column;
      margin-bottom: 6px;
      width: 100%
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
      }

      &-wrapper {
        display: flex;
        justify-content: space-between;
      }
    }

    &__close-icon {
      border: none;
      outline: none;
      cursor: pointer;
      background-color: transparent;
      margin-bottom: 3px;
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
  
  .block {
    display: flex;
    flex-direction: column;
    
    &__day {
      display: flex;
      flex-direction: row;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.4px;
      color: ${COLORS.black};
            
      &-title {
        width: 100px;
        margin-right: 10px;
      }
    }
  }
  
  .checkbox {
    margin-top: 15px;
    
    &__block {
      display: flex;
      flex-direction: row;
      height: 32px;
      align-items: center;
      outline: none;
    }
    
    &__clear{
      min-width: 18px;
      min-height: 18px;
      border: 1px solid ${COLORS.black};
    }
    
    &__title {
      margin-left: 30px;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      color: ${COLORS.black};
    }
    
    &__icon {
      min-width: 18px;
      min-height: 18px;
    }
  }
`;

export default WithDirection(CourseItemEditWrapper);
