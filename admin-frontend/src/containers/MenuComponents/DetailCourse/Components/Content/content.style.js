import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const ContentWrapper = styled.div`
  .content {
    background-color: ${COLORS.grey};
    margin-top: 12px;
  }
  
  .success {
    font-size: 21px;
    line-height: 20px;
    color: ${COLORS.green};
    margin: 30px 0 10px 0;
  }
  
  .date {
    font-weight: 500;
    font-size: 19px;
    line-height: 22px;
    color: ${COLORS.black};
    
    &__title-days {
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      color: ${COLORS.black};
      margin-top: 2px;
    }
    
    &__block {
      display: flex;
      flex-direction: row;
    }
    
    &__day-number {
      margin-left: 50px;
    }
  }

  .header {    
    display: flex;
    flex-direction: row;
    
    @media only screen and (max-width: 767px) {
      flex-direction: column;
    }
    
    &__left {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    
    &__right {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
  }
  
  .button {
    display: flex;
    justify-content: flex-start;
    margin-top: 24px;
  
    &__save {
      &_back {
        margin-left: 10px;
      }
    }
    
    &__resend-email {
      width: 120px;
      height: 40px;
      border-radius: 4px;
      background-color: ${COLORS.grayAlto};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: ${COLORS.black};
      outline: none;
      margin-bottom: 15px;
    }
  }
`;

export default WithDirection(ContentWrapper);
