import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const AdministratorDeleteConfirmWrapper = styled.div`
  .confirm {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 60px;
    &__icon {
      transform: rotate(180deg);
      fill: ${COLORS.black};
    }
    &__title {
      display: flex;
      align-items: center;
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      letter-spacing: 0.15px;
      color: ${COLORS.black};
      margin-left: 24px;
    }
  }
`;

export default WithDirection(AdministratorDeleteConfirmWrapper);
