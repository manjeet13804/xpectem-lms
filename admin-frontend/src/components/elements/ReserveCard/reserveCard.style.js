import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const ReserveCardWrapper = styled.div`
  .reserve-card {
    width: 420px;
    height: 150px;
    margin-top: 30px;
    
    &__text {
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
      color: ${COLORS.black};
            
      &-attention {
        display: flex;
        justify-content: center;
      }
      
      &-certificate {
        display: flex;
        flex-direction: row;
        justify-content: center;
        
        &-city {
          margin-right: 10px;
        }
      }
    }
    
    &__button {
      display: flex;
      justify-content: center;
      margin-top: 32px;
    
      &-yes {
        width: 140px;
        height: 40px;
        border-radius: 4px;
        background-color: ${COLORS.blue};
        font-weight: 500;
        font-size: 14px;
        line-height: 16px;
        color: ${COLORS.white};
        margin-right: 24px;
        outline: none;
        
        &-ok {
          align-self: center;
          width: 140px;
          height: 40px;
          border-radius: 4px;
          background-color: ${COLORS.blue};
          font-weight: 500;
          font-size: 14px;
          line-height: 16px;
          color: ${COLORS.white};
          margin-right: 24px;
          margin-top: 15px; 
          outline: none;
        }
      }
      
      &-no {
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
    @media only screen and (max-width: 767px) {
      &__text {
        font-size: 18px;
      }
    
       &__button {
        margin-top: 15px;
      
        &-yes {
          width: 100px;
        }
        
        &-no {
          width: 100px;
        }
      }
    }
  }
`;

export default WithDirection(ReserveCardWrapper);
