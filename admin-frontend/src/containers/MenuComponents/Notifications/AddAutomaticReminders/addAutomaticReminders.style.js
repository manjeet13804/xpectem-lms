import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const AddAutomaticRemindersWrapper = styled.div`
  .page {
    .ant-slider {
      width: 50%;
    }
    &__percent{
      display: flex;
    }
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
  }
`;

export default WithDirection(AddAutomaticRemindersWrapper);
