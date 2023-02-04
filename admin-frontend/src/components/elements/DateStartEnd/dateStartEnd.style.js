import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const DateStartEndWrapper = styled.div`
  position: relative;
  
  .block {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .date {
    display: flex;
    margin-bottom: 8px;
    @media only screen and (max-width: 767px) {
      flex-wrap: wrap;
    }
    
    &__title {
      align-self: center;
      font-size: 12px;
      line-height: 16px;
      color: ${COLORS.black};
      margin-right: 10px;
      width: 100px;
    }
    
    &__block {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      @media only screen and (max-width: 767px) {
        flex-wrap: wrap;
      }
      
      &-input {
        input {
          flex: 1;
          max-width: 260px;
          border: 1px solid ${COLORS.inputPlaceholder};
          outline: none;
          border-radius: 4px;
          height: 36px;
          color: ${COLORS.black};
          font-size: 16px;
          line-height: 28px;
        }
      }
      
      &-add {
        margin-left: 10px;
        display: flex;
        align-self: center;
        cursor: pointer;
      }
      
      &-current-title {
        font-size: 14px;
        line-height: 16px;
        margin-left: 28px!important;
        color: ${COLORS.black};
        @media only screen and (max-width: 767px) {
          margin-left: 0;
        }
      }
    }
    
     &__date-picker {
        position: absolute;
        top: 0;
        z-index: 12;
      }
  }
`;

export default WithDirection(DateStartEndWrapper);
