import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const CertificationWrapper = styled.div`
  .certification {
    background-color: ${COLORS.grey};
    
    &__title {
      font-weight: normal;
      font-size: 20px;
      line-height: 28px;
      color: ${COLORS.black};
      margin-top: 15px;
    }
    
    &__text {
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: ${COLORS.grayDove};
      
      &-item {
        margin: 10px 10px 0 0;
      }
    }
    
    &__list {
      display: flex;
      flex-direction: column;
      margin: 25px 15px 0 0;
      
      &-header {
        height: 57px;
        width: 100%;
        padding-left: 20px;
        background-color: ${COLORS.black};
        color: ${COLORS.white};
        font-weight: normal;
        font-size: 13px;
        line-height: 16px;
        display: flex;
        align-items: center;
      }
      
   
    }
  }
  .form {
    color: ${COLORS.black};
    margin: 25px 15px 0 0;
    max-width: 1148px;

    &__title {
      font-weight: normal;
      font-size: 20px;
      line-height: 28px;
      color: ${COLORS.black};
      margin-top: 15px;
    }

    &__info {
      margin: 15px 0;
      font-size: 15px
    }

    &__row {
      margin-top: 10px;

      &-radio {
        display: flex;
        flex-direction: column;
        margin-left: 10px;

        .ant-radio-inner {
          height: 17px;
        }
        * {
          color: black;
        }
      }
    }

    &__button {
      margin-top: 10px;
      text-align: end;
    }
  }

  .logs {
    color: ${COLORS.black};
    margin: 25px 15px 0 0;
    max-width: 1148px;

    &__title {
      font-weight: normal;
      font-size: 20px;
      line-height: 28px;
      color: ${COLORS.black};
      margin-top: 15px;
    }

    &__totla {
      margin: 15px 0;
      font-size: 15px
    }

    &__list {
      position: relative;
    }

    &__item {
      display: flex;
      margin: 10px 0;
      padding: 5px 10px;
      align-items: center;

      &_dark {
        background-color: ${COLORS.grayWild};
      }

      &-image {
        width: 20px;
        height: 20px;
        min-width: 20px;
        margin-right: 15px;
      }

      &-info {
        display: flex;
        justify-content: center;
        flex-direction: column;
      }

      &-delete {
        width: 20px;
        height: 20px;
        position: absolute;
        cursor: pointer;
        right: 10px;
      }
    }
  }
`;

export default WithDirection(CertificationWrapper);
