import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const CheckOrganisationsWrapper = styled.div`
  .check-organisations {
    display: flex;
    flex-direction: row;
    height: 32px;
    align-items: center;
    outline: none;
    &__icon {
      min-width: 18px;
      min-height: 18px;
    }
    &__clear {
      min-width: 18px;
      min-height: 18px;
      border: 1px solid ${COLORS.black}; 
      cursor: pointer;
    }
    &__title {
      margin-left: 10px;
    }
  }
`;

export default WithDirection(CheckOrganisationsWrapper);