import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS, SCREENS, FONTS } from 'constants/constants';

const OrgBtnStyleWrapper = styled.div`
  .link {
    text-decoration: none;
  }
  .input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 466px;
    height: 75px;
    background-color: ${COLORS.greyOrg};
    border: 1px solid ${COLORS.greyOrgBorder};
    border-radius: 4px;
    margin-top: 8px;
  }

  .icon-text {
    display: flex;
    align-items: center;
    margin-left: 19px;
    width: 75%;
    overflow: hidden;
  }

  .icon-block {
    width: 18px;
    margin-right: 10px;
  }

  .icon {
    max-width: 18px;
    max-height: 18px;
  }

  .text {
    font-family: ${FONTS.fontFamily};
    font-size: 18px;
    line-height: 48px;
    color: ${COLORS.black};
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .icon-arrow {
    width: 100%;
    max-width: 18px;
    max-height: 18px;
    fill: ${COLORS.black};
    margin-right: 26px;
  }

@media (min-width: ${SCREENS.minMobile}) and (max-width: ${SCREENS.mobile}) {
    .input {
      width: 328px;
      height: 58px;
    }

    .icon-arrow {
      max-width: 16px;
      max-height: 16px;
      margin-right: 24px;
    }

    .text {
      line-height: 24px;
    }
  }
`;

export default WithDirection(OrgBtnStyleWrapper);