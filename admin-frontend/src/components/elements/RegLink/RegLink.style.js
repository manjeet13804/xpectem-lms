import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const RegLinkWrapper = styled.div`
  .reg-link {
    height: 80px;
    display: flex;
    align-items: center;
    
    &__box {
      border-bottom: 1px solid ${COLORS.grayDusty};
      margin-left: 30px;
    }
    
    &__text {
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 0.75px;
      margin-bottom: 15px;
    }
  }
`;

export default WithDirection(RegLinkWrapper);
