import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const NotificationItemWrapper = styled.div` 
  .notification-item {
    width: 100%;
    height: 75px;
    padding: 0 30px;
    display: grid;
    grid-template-columns: 16px 2fr minmax(auto,94px);
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid ${COLORS.grayDashed};
    &__icon {
      justify-self: center;
    }
    &__title {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      letter-spacing: 0.4px;
      color: ${COLORS.black};
      &_cheked {
        color: ${COLORS.mercuryBlack};
      }
    }
    &__date {
      font-style: normal;
      justify-self: flex-end;
      font-weight: normal;
      font-size: 14px;
      text-align: right;
      letter-spacing: 0.25px;
      color: ${COLORS.black};
      mix-blend-mode: normal;
      opacity: 0.9;
      &_cheked {
        color: ${COLORS.mercuryBlack};
      }
    }
  }
`;

export default WithDirection(NotificationItemWrapper);
