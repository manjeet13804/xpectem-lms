import { COLORS } from 'constants/constants';
import WithDirection from 'settings/withDirection';
import styled from 'styled-components';
import { palette } from 'styled-theme';

import { borderRadius, transition } from '../../settings/style-util';

const SidebarWrapper = styled.div`
  margin-right: 10px;
  
  .veil {
     @media only screen and (max-width: 767px) {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: flex-start;
      z-index: 200;
    }
  }
  .isomorphicSidebar {
    background-color: ${COLORS.white};
    width: 280px;
    flex: 0 0 280px;
    z-index: 300;
    .scrollarea {
      height: calc(100vh - 70px);
    }

   @media only screen and (max-width: 767px) {
      width: 360px !important;
      flex: 0 0 360px !important;
      position: absolute;
      z-index: 300;
    }

    &.ant-layout-sider-collapsed {
      @media only screen and (max-width: 767px) {
        width: 0;
        min-width: 0 !important;
        max-width: 0 !important;
        flex: 0 0 0 !important;
      }
    }

    .isoLogoWrapper {
      height: 70px;
      background-color: ${COLORS.white};
      margin: 0;
      padding: 0 10px;
      text-align: center;
      overflow: hidden;
      ${borderRadius()};
      
       @media only screen and (max-width: 767px) {
         text-align: start;
         padding-left: 24px;
       }
      
      .logoContainer {
         display: -webkit-inline-box;
         cursor: pointer;
      }
      
      .collapsedLogoContainer {
        line-height: 70px;
        display: none;
        @media only screen and (max-width: 767px) {
          display: block;
          font-weight: 500;
          font-size: 20px;
          line-height: 64px;
          color: ${COLORS.black};
        }
      }
      
      .xpectumLogo {
        width: 133px;
        height: 28px;
        padding-right: 10px;
        padding-bottom: 3px;
        position: relative;
        top: 20px;
        
        &__collapsed {
          display: none;
          width: 38px;
          padding-bottom: 3px;
        }
      }
      
      h3 {
        font-size: 21px;
        font-weight: 300;
        line-height: 70px;
        letter-spacing: 3px;
        text-transform: uppercase;
        color: ${palette('grayscale', 6)};
        display: block;
        text-decoration: none;
      }
    }

    &.ant-layout-sider-collapsed {
      .isoLogoWrapper {
        padding: 0;

        h3 {
          a {
            font-size: 27px;
            font-weight: 500;
            letter-spacing: 0;
          }
        }
      }
    }

    .isoDashboardMenu {
      padding-bottom: 35px;
      background: transparent;

      a {
        text-decoration: none;
        font-weight: 400;
      }

      .ant-menu-item {
        width: 100%;
        height: 36px;
        background-color: ${COLORS.grayWild};
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        justify-content: space-between;
        padding: 0 12px;
        margin-bottom: 1px;

      }

      .isoMenuHolder {
        display: flex;
        align-items: center;

        i {
          font-size: 19px;
          color: inherit;
          margin: ${props => (props['data-rtl'] === 'rtl' ? '0 0 0 30px' : '0 30px 0 0')};
          width: 18px;
          ${transition()};
        }
      }

      .anticon {
        font-size: 18px;
        margin-right: 30px;
        color: inherit;
        ${transition()};
      }

      .nav-text {
        font-size: 14px;
        color: inherit;
        font-weight: 400;
        ${transition()};
      }

      .ant-menu-item-selected {
        background-color: ${COLORS.blue};
        .anticon {
          color: ${COLORS.white};
        }
        
        i {
          color: ${COLORS.white};
        }

        .nav-text {
          color: ${COLORS.white} !important;
        }
      }

      > li {
        &:hover {
          i,
          .nav-text {
            color: ${COLORS.darkBlue};
          }
        }
      }
    }
    
   .ant-menu-submenu {
      .arrow-icon {
        fill: ${COLORS.white};
        transform: rotate(90deg);
      }
   }
   
   .ant-menu-submenu-open{
     .arrow-icon {
        fill: ${COLORS.white};
        transition: transform .5s;
        transform: rotate(180deg)!important;
      }
   }
   
    .ant-menu-dark .ant-menu-inline.ant-menu-sub {
      background: ${palette('secondary', 5)};
    }

    .ant-menu-submenu-inline,
    .ant-menu-submenu-vertical {
      > .ant-menu-submenu-title {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;
        background-color: ${COLORS.grayWild};
        
        > span {
          display: flex;
          align-items: center;
        }
       
        .ant-menu-submenu-arrow {
          display: none;
          left: ${props => (props['data-rtl'] === 'rtl' ? '25px' : 'auto')};
          right: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '25px')};

          &:before,
          &:after {
            width: 8px;
            ${transition()};
          }

          &:before {
            transform: rotate(-45deg) translateX(3px);
          }

          &:after {
            transform: rotate(45deg) translateX(-3px);
          }
        }

        &:hover {
          .ant-menu-submenu-arrow {
            &:before,
            &:after {
              color: ${COLORS.white};
            }
          }
        }
      }

      .ant-menu-inline,
      .ant-menu-submenu-vertical {
        > li:not(.ant-menu-item-group) {
          padding-left: ${props => (props['data-rtl'] === 'rtl' ? '0px !important' : '24px !important')};
          padding-right: ${props => (props['data-rtl'] === 'rtl' ? '24px !important' : '0px !important')};
          font-size: 13px;
          font-weight: 400;
          margin: 0;
          color: inherit;
          ${transition()};

          &:hover {
            a {
              color: ${COLORS.blue}!important;
            }
          }
        }
        .ant-menu-item-group {
          padding-left: 0;

          .ant-menu-item-group-title {
            padding-left: 100px !important;
          }
          .ant-menu-item-group-list {
            .ant-menu-item {
              padding-left: 125px !important;
            }
          }
        }
      }

      .ant-menu-sub {
        box-shadow: none;
        background-color: transparent !important;
      }
    }

    &.ant-layout-sider-collapsed {
      .nav-text {
        display: none;
      }

      .ant-menu-submenu-inline >  {
        .ant-menu-submenu-title:after {
          display: none;
        }
      }

      .ant-menu-submenu-vertical {
        > .ant-menu-submenu-title:after {
          display: none;
        }

        .ant-menu-sub {
          background-color: transparent !important;

          .ant-menu-item {
            height: 35px;
          }
        }
      }
    }

    .ant-menu-submenu-selected {
      .ant-menu-submenu-title {
        background-color: ${COLORS.blue}!important;
      }

      .nav-text {
        color: ${COLORS.white};
      }

      .ant-menu-item {
        &-selected {
          span {
            color: ${COLORS.blue};
          }
        }

      }
    }
  }
`;

export default WithDirection(SidebarWrapper);
