import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const SearchOrganisationsWrapper = styled.div`
  .search-block {
    background-color: ${COLORS.grayWild};
    width: 100%;
    margin-top: 2px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
  }
`;

export default WithDirection(SearchOrganisationsWrapper);
