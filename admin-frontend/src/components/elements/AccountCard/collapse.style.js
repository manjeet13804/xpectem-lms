import styled from 'styled-components';
import { palette } from 'styled-theme';
import { COLORS } from 'constants/constants';
import { borderRadius, transition } from 'settings/style-util';
import WithDirection from 'settings/withDirection';

const CollapseWrapper = styled.div`
  .ant-collapse {
    background-color: transparent;
    border-radius: 0;
    border: 0;

    > .ant-collapse-item {
      background-color: ${COLORS.white};
      border-radius: 4px;
      border: 1px solid ${palette('border', 0)};
      
      margin-bottom: 0;

      &:last-child {
        margin-bottom: 0;
      }

      > .ant-collapse-header {
        display: flex;
        align-items: center;
        height: 45px;
        line-height: 20px;
        padding-left: ${props => (props['data-rtl'] === 'rtl' ? '32px' : '16px')};
        padding-right: ${props => (props['data-rtl'] === 'rtl' ? '16px' : '32px')};
        font-weight: normal;
        font-size: 14px;
        cursor: pointer;
        position: relative;
        border-bottom: none;
        ${transition(0.4)};
        ${borderRadius('4px 4px 0 0')};

        .arrow {
          font-size: 16px;
          transform: ${props =>
  props['data-rtl'] === 'rtl'
    ? 'scale(0.75) rotate(180)'
    : 'scale(0.75) rotate(0)'};
          right: ${props => (props['data-rtl'] === 'rtl' ? 'auto' : '20px')};
          left: ${props => (props['data-rtl'] === 'rtl' ? '20px' : 'auto')};
        }

        &[aria-expanded='true'] {
          .arrow {
            font-size: 16px;
          }
        }
      }

      .ant-collapse-content {
        border: none;
        ${borderRadius('0 0 4px 4px')};

        p {
          font-size: 13px;
          color: ${palette('text', 3)};
        }
      }

      &.ant-collapse-item-active {
        > .ant-collapse-header {
          .arrow {
            transform: ${props =>
  props['data-rtl'] === 'rtl'
    ? 'scale(0.75) rotate(90deg)'
    : 'scale(0.75) rotate(90deg)'};
          }
        }
      }
    }

    &.ant-collapse-borderless {
      > .ant-collapse-item {
        border-radius: 0;
        border: 0;

        > .ant-collapse-header {
          background-color: ${palette('secondary', 1)};
          ${borderRadius()};
        }

        .ant-collapse-content {
          border-top: 0;
          ${borderRadius()};
        }
      }
    }
    
    @media only screen and (max-width: 767px) {
      .ant-collapse-content > .ant-collapse-content-box {
        padding: 0;
      }
    }
  }
`;

export default WithDirection(CollapseWrapper);
