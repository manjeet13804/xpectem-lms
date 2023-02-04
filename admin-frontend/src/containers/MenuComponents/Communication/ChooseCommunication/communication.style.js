import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const ChooseCommunicationWrapper = styled.div`
  .page {
    display: flex;
    flex-direction: column;
    &__title {
      font-size: 16px;
      line-height: 28px;
      margin-bottom: 12px;
      font-style: normal;
      font-weight: normal;
      letter-spacing: 0.4px;
      color: ${COLORS.black};
    }
    &__wrapper {
      display: flex;
      flex-directiom: row;
      heigth: 100%;
      width: 100%;
      @media only screen and (max-width: 767px) {
        flex-direction: column;
      }
    }
    &__list-item {
      width: 100%;
    }
    &__search {
      height: 36px;
      display: flex;
      align-items: center;
      margin-top: 40px;
      margin-left: 30px;
      @media only screen and (max-width: 560px) {
        margin: 20px 0;
      }
    }
    &__input {
      font-size: 16px;
      width: 100%;
      appearance: none;
      border: none;
      outline: none;
      margin-left: 18px;
    }
  }
`;

export default WithDirection(ChooseCommunicationWrapper);
