import styled from 'styled-components';
import { palette } from 'styled-theme';
import { COLORS } from 'constants/constants';
import { borderRadius, transition } from '../../../settings/style-util';
import WithDirection from '../../../settings/withDirection';

const CollapseQuestionsWrapper = styled.div`
 
  .item {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 15px;
    height: 48px;
    
    &__title {
      font-weight: normal;
      font-size: 16px;
      color: ${COLORS.black};
      max-height: 26px;
      overflow: hidden;

      .public-DraftStyleDefault-block {
        margin: 0;
      }
    }
    
    &__actions {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 100%;
      
      &-button {
        margin-right: 4px;
      }
    }
    &__access {
        width: 60px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        margin-top: 5px;
        &_user {
          background-color: orange;
        }
        &_admin {
          background-color: blue;
        }
        &_all {
          background-color: green;
        }
        &-text {
          color: whitesmoke;
          text-transform: capitalize;
          font-size: 18px;
          font-weight: 500;
        }
      }
  }
  
  .ant-progress-text {
    display: none;
  }

  .ant-collapse {
    background-color: transparent;
    border-radius: 0;
    border: 0;
    max-width: 672px;

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
        line-height: 22px;
        padding-left: ${props => (props['data-rtl'] === 'rtl' ? '32px' : '16px')};
        padding-right: ${props => (props['data-rtl'] === 'rtl' ? '16px' : '32px')};
        font-weight: normal;
        font-size: 24px;
        color: ${palette('text', 0)};
        cursor: pointer;
        position: relative;
        background-color: ${COLORS.white};
        ${transition(0.4)};
        ${borderRadius('4px 4px 0 0')};

        &[aria-expanded='true'] {
          .item {
            &__actions {
              &-button {
                &_edit {
                  display: none;
                }
                &_save {
                  display: unset;
                }
              }
            }
          }
        }
          &[aria-expanded='false'] {
          .item {
            &__actions {
              &-button {
                &_edit {
                  display: unset;
                }
                &_save {
                  display: none;
                }
              }
            }
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

    .custom-button {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: center;
      justify-content: center;
      background-color: ${COLORS.black};
      border-radius: 5px;
      width: -webkit-fit-content;
      width: -moz-fit-content;
      width: fit-content;
      margin: 10px auto;

      .customButton {
        width: 160px;
        height: 32px;
        letter-spacing: 0;
        background-color: ${COLORS.gray};
        color: #cacaca;
        font-size: 12px;
        border: 1.5px solid ${COLORS.grayBorder}
        border-radius: 5px;
        border-color: black;
        cursor: pointer;
        font-size: 20px;
        font-weight: 500;
        text-transform: capitalize;
      }

    .user {
        color: white;
        background-color: orange;
        border: 1.5px solid orange;
    }
  
    .admin {
        color: white;
        background-color: blue;
        border: 1.5px solid blue;
    }
    
    .all {
      color: white;
      background-color: green;
      border: 1.5px solid green;
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

export default WithDirection(CollapseQuestionsWrapper);
