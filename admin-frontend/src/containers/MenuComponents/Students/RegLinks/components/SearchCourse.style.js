import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const SearchCourseWrapper = styled.div`
.course {

  &__header {
    font-size: 22px;
    color: ${COLORS.black};
    margin-top: 15px;
  }
  
  &__select-all {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 10px;
  }
  
  &__title {
    font-weight: normal;
    font-size: 16px;
    line-height: 28px;
    color: ${COLORS.black};
    margin-right: 30px;
    
    &-select {
      margin-top: 15px;
    }
    
    &-search {
      margin-top: 15px;
    }
  }
  
  &__search {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 8px 0 20px 14px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid ${COLORS.inputPlaceholder};

    &-input {
      width: 100%;
      appearance: none;
      border: none;
      outline: none;
      margin-left: 18px;
      font-size: 16px;
      line-height: 27px;
    }
    
    &-title {
      margin-top: 40px;
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      letter-spacing: 0.15px;
      color: ${COLORS.black};
    }
  }
  
  &__selected {
    color: ${COLORS.black};
    margin-top: 8px;
    
    &-title {
      margin-top: 16px;
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      letter-spacing: 0.15px;
    }
    
    &-text {
      margin-top: 6px;
      font-size: 16px;
      line-height: 28px;
    }
    
    &-block {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    
    &-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      height: 28px;
      background-color: ${COLORS.greyBack};
      margin-left: 8px;
      outline: none;
      
      &-text {
        padding-left: 7px;
        font-size: 16px;
        line-height: 28px;
        height: 28px;
        overflow: hidden;
      }
      
      &-icon {
        padding-right: 4px;
        height: 24px;
        width: 24px;
      }
    }
  }
  
  &__button {
    display: flex;
    justify-content: flex-end;
    margin-top: 84px;
    
    &-add {
      height: 40px;
      min-width: 140px;
      color: ${COLORS.black};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
    }
  }
}
`;

export default WithDirection(SearchCourseWrapper);
