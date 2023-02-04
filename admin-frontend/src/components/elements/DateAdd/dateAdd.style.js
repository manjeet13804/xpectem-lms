import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const DateSvgWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  position: relative;
  
  .date {
    &__access-expire-at {
      display: flex;
      
      p:first-child {
        margin-right: 5px;
      }
    }
    
    &__error {
      color: red;
      font-size: 12px;
    }
  
    &__title {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      line-height: 16px;
      color: ${COLORS.black};
    }
    &__block {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 16px;
      position: relative;
      @media only screen and (max-width: 767px) {
        flex-wrap: wrap;
      }
      &-input {
        outline: none;
        width: 260px;
        height: 36px;
        font-size: 16px;
        line-height: 28px;
        border: 1px solid ${COLORS.inputPlaceholder};
        padding: 0 5px;
        border-radius: 5px;
        
        &_error {
          background: #fff6f6;
          border: 1px solid #e0b4b4;
          border-radius: 4px;
        }
        
        &::placeholder {
          color: ${COLORS.inputPlaceholder};
        }
      }
      &-add {
        margin-left: 14px;
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

export default WithDirection(DateSvgWrapper);
