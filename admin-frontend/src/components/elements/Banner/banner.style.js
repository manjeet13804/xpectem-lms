import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const BannerWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 56px;
  
  .image-layout {
    position: absolute;
    width: 100%;
    height: 56px;
  }

  .title {
    align-self: center;
    position: absolute;
    font-size: 24px;
    line-height: 28px;
    color: ${COLORS.white};
    padding-left: 16px;
    @media only screen and (max-width: 767px) {
      font-size: 20px;
      line-height: 23px;
    }
  }
`;

export default WithDirection(BannerWrapper);