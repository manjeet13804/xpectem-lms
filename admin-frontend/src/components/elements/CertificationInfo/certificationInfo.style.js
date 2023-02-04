import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const CertificationInfoWrapper = styled.div`
  .certification-info {
    margin-top: 16px;
    width: 100%;
    &__item {
      margin-top: 6px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    &__items-wrapper {
      margin-top: 12px;
    }
    &__item-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: ${COLORS.blueMercury};
    }
    &__item-data {
      margin-left: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

export default WithDirection(CertificationInfoWrapper);
