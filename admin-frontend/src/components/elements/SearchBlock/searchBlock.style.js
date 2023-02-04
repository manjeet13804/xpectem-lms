import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const SearchBlockWrapper = styled.div`
  .search-block {
    width: 300px;
    &__title {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.4px;
      color: ${COLORS.black};
      text-align: left;
    }
    &__input-wrapper {
      height: 36px;
      display: flex;
      align-items: center;
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
    &__arrow {
      margin-right: 6px;
      transform: rotate(180deg);
      transition: 1.5s transform; 
      &_down {
        transform: rotate(0deg);
      }
    }
    &__block-list {
      display: flex;
      flex-direction: column;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
      border-radius: 4px;
      background: ${COLORS.white};
      overflow: auto;
      max-height: 120px;
      width: 100%;
    }
    &__item {
      margin: 4px 0 0 8px;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      color: ${COLORS.black};
      cursor: pointer;
    }
    &__new-topic {
      display: flex;
      align-items: center;
      padding-left: 8px;
      height: 60px;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      letter-spacing: 0.4px;
      color: ${COLORS.blueMercury};
      border-top: 1px solid ${COLORS.greyAlto};
      cursor: pointer;
      outline: none;
    }
  }
`;

export default WithDirection(SearchBlockWrapper);
