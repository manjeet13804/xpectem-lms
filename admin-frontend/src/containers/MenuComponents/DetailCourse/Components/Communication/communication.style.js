import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const CommunicationWrapper = styled.div`
  .title {
    font-weight: normal;
    font-size: 20px;
    color: ${COLORS.black};
    margin-top: 12px;
  }

  .communication {
    background-color: ${COLORS.grey};
    display: flex;
    flex-direction: row;
    max-width: 1173px;
    @media only screen and (max-width: 767px) {
       display: flex;
       flex-direction: column; 
    }

    &__search {
      height: 36px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      margin-left: 30px;
    }

    &__input {
      font-size: 16px;
      width: 100%;
      appearance: none;
      border: none;
      outline: none;
      margin-left: 18px;
    }

    &__left {
      flex: 3;
      padding-right: 35px;
    }
    
    &__right {
      flex: 1;
      max-width: 295px;
      min-width: 295px;
    }
    
    &__avatar {
      display: flex;
      flex-direction: row;
      align-items: center;
      &-name {
        font-weight: normal;
        font-size: 14px;
        margin-left: 16px;
      }
    }
  }
`;

export default WithDirection(CommunicationWrapper);
