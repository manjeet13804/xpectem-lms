import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const ReportNotificationsWrapper = styled.div` 
  .page {
    max-width: 568px;
    height: 100%;
    
    &__description {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      letter-spacing: 0.4px;
      color: ${COLORS.black};
    }
    &__title {
      margin-top: 12px;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      letter-spacing: 0.15px;
      color: ${COLORS.black};
      mix-blend-mode: normal;
      opacity: 0.9;
    }
    &__notifications {
      display: flex;
      flex-direction: column;
      position: relative;

      &-list {
        max-height: 500px;
        overflow: auto;
      }
      &-select-wrap{
         align-self: flex-end;
       }
    }
  }
`;

export default WithDirection(ReportNotificationsWrapper);
