import styled from 'styled-components';
import WithDirection from 'settings/withDirection';

const NotificationTypeItemWrapper = styled.div`
  .notification-icon {
    margin-top: 10px;
    margin-left: 10px;
    .anticon {
      svg {
        display: inline-block;
      }
    }
  }
`;

export default WithDirection(NotificationTypeItemWrapper);
