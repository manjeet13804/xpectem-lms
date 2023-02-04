import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const StartWrapper = styled.div`
  .about-company {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    height: 100%;
    background-color: ${COLORS.white};
 
  @media only screen and (max-width: 767px) {
    min-width: 360px;
    display: flex;
    flex-direction: column;
    padding: 16px 16px;
  }
  
  .logo {
      max-width: 250px;
      margin-right: 15px;
  
    @media only screen and (max-width: 767px) {
        max-width: 100%;
        box-sizing: border-box;
        margin-right: 0;
        margin-bottom: 16px;
        align-self: center;
      }
    }
  
  .text {
      color: ${COLORS.grayMineShaft};
      font-size: 20px;
      line-height: 28px;
      white-space: pre-line;
      flex: 1;
    }
`;

export default WithDirection(StartWrapper);