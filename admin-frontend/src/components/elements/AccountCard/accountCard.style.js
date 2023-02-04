import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const AccountCardWrapper = styled.div`
  .account-card {
    margin-top: 16px;

    &__avatar {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 10px;
      margin-left: 16px;
      
      &-name {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-weight: normal;
        font-size: 14px;
        margin-left: 16px;
        
        &-first {
          margin-right: 10px;
        }
      }
    }
    
    &__account {
      display: flex;
      flex-direction: row;
      margin-top: 4px;
      margin-bottom: 10px;
      
      &-title {
        font-weight: normal;
        font-size: 12px;
        margin-left: 16px;
        color: ${COLORS.black};
        min-width: 90px;
      }
      &-value {
        font-weight: normal;
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        max-width: 90%;
        text-overflow: ellipsis;
      }
    }
    
    &__course {
      &-title {
        font-weight: normal;
        font-size: 14px;
        color: ${COLORS.black};
        margin-left: 16px;
      }
    }
    
    &__created {
      display: flex;
      flex-direction: column;
      
      &-ordered {
        display: flex;
        flex-direction: row;
        margin-top: 5px;
         
        &-title {
          font-weight: normal;
          font-size: 12px;
          margin-left: 16px;
          color: ${COLORS.black};
          min-width: 90px;
        }
        
        &-value {
          display: flex;
          flex-direction: column;
          font-weight: normal;
          font-size: 12px;
          &-span {
            overflow: hidden;
            white-space: nowrap;
            max-width: 90%;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
`;

export default WithDirection(AccountCardWrapper);
