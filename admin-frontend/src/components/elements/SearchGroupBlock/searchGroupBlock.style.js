import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const SearchGroupBlockWrapper = styled.div`
  .link {
    outline: none;
    &_disabled {
      pointer-events: none;
    }
  }
  .belong-height {
    height: 80px;
  }
  .search-height {
    height: 58px;
  }
  .search-block {
    background-color: ${COLORS.grayWild};
    width: 100%;
    margin-top: 2px;
    display: flex;
    flex-direction: row;
    padding-left: 16px;
    padding-top: 8px;
    overflow: hidden;
    &__text {
      display: flex;
      flex-direction: column;
      margin-bottom: 6px;
    }
    &__title {
      font-size: 16px;
      color: ${COLORS.black};
    }
    &__belong {
      font-size: 14px;
      color: ${COLORS.grayDove};
    }
    &__date {
      font-size: 14px;
      color: ${COLORS.grayDove};
    }
    &__checkbox {
      pointer-events: auto;
    }
  }
`;

export default WithDirection(SearchGroupBlockWrapper);
