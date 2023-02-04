import { COLORS } from 'constants/constants';
import WithDirection from 'settings/withDirection';
import styled from 'styled-components';

const FindCourseCreatorsWrapper = styled.div`
  .title {
    display: flex;
    flex-direction: column;
    @media only screen and (max-width: 767px) {
      margin-left: 16px;
    }
    &__item {
      font-weight: normal;
      font-size: 16px;
      line-height: 28px;
      color: ${COLORS.black};
      margin-bottom: 15px;
    }
  }

  .page {
    display: flex;
    flex-direction: row;
    height: 100%;
    min-height: calc(100% - 230px);
    margin-right: 16px;
     @media only screen and (max-width: 767px) {
       display: flex;
       flex-direction: column;
       margin-left: 16px;
     }
    
    &__left {
      flex: 1;
      margin-right: 4px;
    }
    &__right {
      flex: 1;
      margin-left: 4px;
      display: flex;
      flex-direction: column;
    }
  }

  .student {
    &__firstname {
      
      &-title {
        font-size: 12px;
        line-height: 16px;
        color: ${COLORS.black};
      }
      
      &-input {
        width: 100%;
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.greyInput};
        outline: none;
        border: none;
        margin-top: 14px;
        margin-left: 16px;
      }
    }
    
    &__lastname {
      margin-top: 14px;
      &-title {
        font-size: 12px;
        line-height: 16px;
        color: ${COLORS.black};
      }
      
      &-input {
        width: 100%;
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.greyInput};
        outline: none;
        border: none;
        margin-top: 14px;
        margin-left: 16px;
      }
    }
    
    &__email {
      margin-top: 14px;
      
      &-title {
        font-size: 12px;
        line-height: 16px;
        color: ${COLORS.black};
      }
      
      &-input {
        width: 100%;
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.greyInput};
        outline: none;
        border: none;
        margin-top: 14px;
        margin-left: 16px;
      }
    }
    
    &__telephone {
      margin-top: 14px;
      
      &-title {
        font-size: 12px;
        line-height: 16px;
        color: ${COLORS.black};
      }
      
      &-input {
        width: 100%;
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.greyInput};
        outline: none;
        border: none;
        margin-top: 14px;
        margin-left: 16px;
      }
    }
    
    &__person {
      margin-top: 14px;
      &-title {
        font-size: 12px;
        line-height: 16px;
        color: ${COLORS.black};
      }
      
      &-input {
        width: 100%;
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.greyInput};
        outline: none;
        border: none;
        margin-top: 14px;
        margin-left: 16px;
      }
    }
    
    &__employee {
      margin-top: 14px;
      &-title {
        font-size: 12px;
        line-height: 16px;
        color: ${COLORS.black};
      }
      
      &-input {
        width: 100%;
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.greyInput};
        outline: none;
        border: none;
        margin-top: 14px;
        margin-left: 16px;
      }
    }
    
    &__button {
      display: flex;
      justify-content: flex-end;
      margin-top: 40px;
      
      &-search {
        width: 140px;
        height: 40px;
        border-radius: 4px;
        background-color: ${COLORS.grayAlto};
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: ${COLORS.black};
        outline: none;
      }
    }
  }
  
  .button {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
    
    &__search {
      width: 140px;
      height: 40px;
      border-radius: 4px;
      background-color: ${COLORS.grayAlto};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: ${COLORS.black};
      outline: none;
      border: none;
    }
  }
  
  .main__title {
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    margin-top: 43px;
    color: ${COLORS.black};
  }
  
  .main__search-groups {
    margin-top: 30px;
  }

  .main {
    &__not-found {
      height: 100%;
      width: 100%;
      font-size: 30px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      max-height: 400px;
      color: ${COLORS.silverLighter};
    }
  }
`;

export default WithDirection(FindCourseCreatorsWrapper);
