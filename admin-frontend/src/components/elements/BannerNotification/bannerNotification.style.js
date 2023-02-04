import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const BannerWrapper = styled.div`
  .block {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 35px;
    align-items: center;
    padding-left: 10px;
    justify-content: space-between;
    &-green {
      background-color: ${COLORS.green};
    }
    &-red {
       background-color: ${COLORS.redPomegranate};    
    }
  }
  .info {
    display: flex;
    flex-direction: row;
    align-items: center;

    i.icon {
      width: unset !important;
      background-color: white !important;

      &.check.square:before {
        color: ${COLORS.green};
        font-size: 30px;
        position: relative;
        top: -5px;
      }
    }
  }
  .title {
    font-size: 20px;
    line-height: 23px;
    color: ${COLORS.white};
    padding-left: 10px;
    @media only screen and (max-width: 767px) {
      font-size: 14px;
      line-height: 17px;
    }
  }
  .close {
    align-items: center;
    outline: none;
  }
`;

export default WithDirection(BannerWrapper);