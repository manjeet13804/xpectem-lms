import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const SearchAdminWrapper = styled.div`
  background-color: ${COLORS.grayWild};
  margin-top: 1px;

  .admin-search {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 97px;
    margin-left: 16px;
    
    &__name {
      font-size: 16px;
      line-height: 30px;
      color: ${COLORS.black};
    }
    &__option {
      font-size: 14px;
      line-height: 20px;
      color: ${COLORS.grayDove};
      &:before {
        content: '-';
      }
    }
    &__groupName {
      margin-left: 5px;
    }
  }
`;

export default WithDirection(SearchAdminWrapper);
