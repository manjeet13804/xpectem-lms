import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const GroupsPermissions = styled.div`
.ant-checkbox-checked .ant-checkbox-inner {
  background-color: green;
  border-color: green;
}
.title{
  vertical-align: middle;
  display: inline-block;
  &__one{
    overflow: hidden;
  margin-top: -1px;
  transform: rotate(10deg);
  border-right: 1px solid #000;
    }
  &__oneh1{
    margin-right: -20px;
  transform: rotate(-10deg);
  }
  &__twoh1{
    color: orange;
  margin: 40px 0 0 -10px;
  }
}
.table-report{
  &__table {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    &__download {
      &-btn {
        .button__add {
          font-weight: 500;
          text-transform: uppercase;
        }
        margin-top: 24px;
        &-file {
          height: 40px;
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          background-color: ${COLORS.grayMercury};
          outline: none;
        }
      }
    }

    &__header {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 37px;
      width: fit-content;
      background-color: ${COLORS.greyBGElement};
      font-weight: bold;
      font-size: 16px;
      line-height: 28px;
      color: ${COLORS.black};
      margin-top: 24px;
      padding-left: 200px;
    }
    &__title{
      background-color: ${COLORS.greyBGElement};
    }

    &__row {
      display: flex;
      flex-direction: row;
      min-height: 33px;
      font-weight: normal;
      font-size: 16px;
      line-height: 28px;
      margin-top: 5px;
      padding-left: 12px;
    }

    &__column {
      flex: 1;
      min-width: 250px;
      max-width: 250px;
      width: 250px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-left: 16px;
      &:last-child {
        flex: 2;
        padding-right: 12px;
      }
    }
}
  .page {
    display: flex;
    flex-direction: row;
    height: 100%;
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
    
    &__drag-and-drop-description {
      color: ${COLORS.black};
      font-size: 16px;
    }
  }

  .button-wrapper {
    display: flex;
    justify-content: flex-end;
    margin: 30px;
  }
  
  .permissions-title {
    margin: 15px 0;
  }

  .work-description {
    margin: 15px 0;
  }

  .group {
    margin-top: 44px;
    font-size: 12px;
    line-height: 16px;
    color: ${COLORS.black};
    
    &__range-input {
      max-width: 450px;
    }
    
    &__input-count-max {
      max-width: 50px;
    }
    
    &__input-error {
      color: red;
    }
    
    &__name {
      
      &-input {
        max-width: 568px;
        width: 100%;
      }
    }
    &__optional {
      margin-top: 14px;
    }
  }
  .checkbox-group {
    display: flex;
    flex-direction: column; 
  }
  .main-title {
    display: flex;
    flex-direction: column;
    &__welcome {
      margin-top: 44px;
      font-size: 24px;
      line-height: 28px;
      color: ${COLORS.black};
    }
    &__logotype {
      margin-top: 32px;
      margin-bottom: 8px;
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      color: ${COLORS.black};
    }
  }
  .welcome-text__admin {
    font-size: 12px;
    line-height: 16px;
    color: ${COLORS.black};
    margin: 15px 0px;
  }
  .welcome-text__student {
    font-size: 12px;
    line-height: 16px;
    color: ${COLORS.black};
    margin: 15px 0px;
  }
    .button {
      display: flex;
      justify-content: flex-end;
      margin-top: 32px;
      align-items: center;
      &__add {
        border: 0;
        height: 40px;
        min-width: 140px;
        width: auto;
        font-weight: bold;
        background-color: ${COLORS.defaultButtonColor};
        border-radius: 4px;
        
        &:disabled {
          color: gray;
        }
      }
      
      &__loader {
        margin-right: 10px !important;
      }
      
      &__delete {
        width: 140px;
        height: 40px;
        border-radius: 4px;
        background-color: ${COLORS.redPomegranate};
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: ${COLORS.white};
        margin-right: 24px;
        outline: none;
      }
    }
`;

export default WithDirection(GroupsPermissions);
