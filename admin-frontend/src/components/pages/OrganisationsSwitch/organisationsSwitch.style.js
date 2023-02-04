import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { SCREENS } from 'constants/constants';

const OrgSwitchStyleWrapper = styled.div`
  .organisations-switch {
    width: 576px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10% auto 0;
  }
  .text {
    width: 82%;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 25px;
  }
  
  @media (min-width: ${SCREENS.minMobile}) and (max-width: ${SCREENS.mobile}) {
    width: 100%;
    margin-top: 64px;
  
  .logo {
      width: 148px;
      height: 31px;
    }
  
  .line {
      width: 328px;
      margin-left: 80px;
      margin-right: 80px;
    }
  
  .text {
      width: 328px;
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 25px;
    }
  }
`;

export default WithDirection(OrgSwitchStyleWrapper);