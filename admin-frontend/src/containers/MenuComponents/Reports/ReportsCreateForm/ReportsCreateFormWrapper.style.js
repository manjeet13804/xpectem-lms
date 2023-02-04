import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const ReportsCreateFormWrapper = styled.div`
.table-report{
  &__table {
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }
    &__download {
      &-btn {
        margin-top: 24px;
        .button__add {
          font-weight: 500;
          text-transform: uppercase;
        }
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
      padding-left: 12px;
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
      margin-left: 16px;
      width: 250px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:last-child {
        flex: 2;
        padding-right: 12px;
      }
    }
}
  .import-status {
    display: flex;
    flex-direction: column;
    color: ${COLORS.black};
    
    &__download {
      &-btn {
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

    &__icon {
      transform: rotate(180deg);
    }
    
    &__text {
      display: flex;
      flex-direction: column;
      
      @media only screen and (max-width: 767px) {
        margin-left: 16px;  
      }
      
      &-attention {
        display: flex;
        flex-direction: row;
        align-self: center;
        margin-top: 50px;
        
        &-title {
          display: flex;
          align-self: center;
          font-weight: 500;
          font-size: 20px;
          color: ${COLORS.black};
          margin-left: 24px;
        }
      }
      
      &-title {
      display: flex;
      flex-direction: column;
      align-self: center;
        margin-top: 70px;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 28px;
        
        &-describe {
          
        }
        
        &-example {
          margin-top: 20px;
        }
      }
    }
  }
`;

export default WithDirection(ReportsCreateFormWrapper);
