import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const RegLinksWrapper = styled.div`
  
  .wrapper {
    max-width: 1200px;
  }

  .title {
    display: flex;
    flex-direction: column;
    width: 100%;
    @media only screen and (max-width: 767px) {
      margin-left: 16px;
    }
    &__title {
      font-weight: normal;
      font-size: 24px;
      font-weight: 500;
      line-height: 28px;
      color: ${COLORS.black};
      margin: 15px 0;
    }
    &__item {
      font-weight: normal;
      font-size: 16px;
      line-height: 28px;
      color: ${COLORS.black};
      margin-bottom: 15px;
      &-row {
        display: flex;
        flex-direction: row;
      }
      &-list {
        flex: 1;
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
        margin-top: 16px;
        margin-left: 20px;
        color: ${COLORS.black};
        @media only screen and (max-width: 767px) {
          margin-left: 0; 
        }
      }
    }
    
    &__icon {
      width: 20px;
      height: 20px;
      transform: rotate(180deg);
      fill: ${COLORS.black};
      margin-top: 3px;
      margin-left: 15px;
      @media only screen and (max-width: 767px) {
        margin: 0 10px; 
      }
    }
    
    &__hidden {
      @media only screen and (max-width: 767px) {
        display: none;
      }
    }
  }
  
  .course {
    margin-top: 30px;
    
    &__button {
      display: flex;
      margin-top: 10px;
      
    &-add {
      min-width: 140px;
      height: 40px;
      color: ${COLORS.black};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      }
    }
  }
`;

export default WithDirection(RegLinksWrapper);
