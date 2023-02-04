import styled from 'styled-components';
import WithDirection from 'settings/withDirection';

const SearchResultWrapper = styled.div`
height: 100%;
  .result-search-block {
    height: 100%;
    padding-left: 5px;
    &__item {
      background-color: #EEEEEE;
      border: 1px solid #979797;
      border-top: none;
      min-height: 80px;
      padding: 10px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
    
      &:first-child {
        border-top: 1px solid #979797;
      }
    
      &:nth-child(2n) {
        background-color: unset;
      }
    }
  }
`;

export default WithDirection(SearchResultWrapper);
