import styled from 'styled-components';
import { palette } from 'styled-theme';
import { COLORS } from 'constants/constants';
import { borderRadius, transition } from '../../../settings/style-util';
import WithDirection from '../../../settings/withDirection';

const CollapseQAWrapper = styled.div`
  .icon {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &__text{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &__container{
      display: flex;
    }

    &__plus{
      margin-right: 5px;
    }

    &__minus{
      margin-right: 5px;
    }

    &__delete_button{
      border: none;
      background-color: unset;
    }
  }


  .button {
    display: flex;
    justify-content: flex-end;
    max-width: 812px;
    
    &__add {
      width: 140px;
      height: 40px;
      border-radius: 4px;
      background-color: ${COLORS.grayAlto};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: ${COLORS.black};
      outline: none;
      margin-top: 5px;
    }
  }
  
  .ant-collapse > .ant-collapse-item > .ant-collapse-header .arrow:before {
      content: "";
  }

  .ant-progress-text {
    display: none;
  }

  .ant-collapse {
    background-color: transparent;
    border-radius: 0;
    border: 0;
    max-width: 812px;

    > .ant-collapse-item {
      background-color: ${COLORS.white};
      border-radius: 4px;
      border: 1px solid ${palette('border', 0)};
      margin-bottom: 5px;

      &:last-child {
        margin-bottom: 0;
      }

      > .ant-collapse-header {  
        display: flex;
        align-items: center;
        height: 48px;
        line-height: 22px;
        padding-left: ${props => (props['data-rtl'] === 'rtl' ? '32px' : '16px')};
        padding-right: ${props => (props['data-rtl'] === 'rtl' ? '16px' : '32px')};
        font-weight: normal;
        font-size: 24px;
        color: ${palette('text', 0)};
        cursor: pointer;
        position: relative;
        background-color: ${palette('grayscale', 6)};
        ${transition(0.4)};
        ${borderRadius('4px 4px 0 0')};
        
        &[aria-expanded='true'] {
          .icon__plus {
            display: none;
          }
           .icon__minus {
            display: unset;
          }
        }    
        &[aria-expanded='false'] {
         .icon__plus {
             display: unset;
          }
          .icon__minus {
            display: none;
          }
        }
      }

      .ant-collapse-content {
        border-top: 1px solid ${palette('border', 0)};
        ${borderRadius('0 0 4px 4px')};

        p {
          font-size: 13px;
          color: ${palette('text', 3)};
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
  
  .modal {
    background-color: #1d5d90;
  }
`;

export default WithDirection(CollapseQAWrapper);
