import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const AssignmentBlockWrapper = styled.div`
  .assignment-block {
    max-width: 672px;
    background-color: ${COLORS.greyOrg};
    margin-top: 1px;

    &__chapter {
     font-weight: normal;
     font-size: 18px;
     line-height: 32px;
     color: ${COLORS.black};
     padding-left: 25px;
     padding-top: 10px;
    }
     
    &__title {
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      margin-top: 10px;
      padding-left: 25px;
    }
    
    &__assignment {
      padding-left: 40px;
    }
  }
`;

export default WithDirection(AssignmentBlockWrapper);
