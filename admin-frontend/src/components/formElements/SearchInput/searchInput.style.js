import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const SearchInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: self-end;
  .search-input {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 8px 0;
    padding: 0 13px;
    border-radius: 5px;
    border: 1px solid ${COLORS.inputPlaceholder};
    width: 100%;

    svg {

    }

    &__title {
      width: 100%;
      margin-top: 20px;
    }
    &__selected {
      font-size: 16px;
      font-weight: 600;
    }
    &__input {
      width: 100%;
      appearance: none;
      outline: none;
      margin-left: 10px;
      font-size: 16px;
      line-height: 38px;
      border: none;
    }
    &__button {

    }
  }
`;


export default WithDirection(SearchInputWrapper);
