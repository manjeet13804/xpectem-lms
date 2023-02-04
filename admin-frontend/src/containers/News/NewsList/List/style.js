import styled from 'styled-components';
import { palette } from 'styled-theme';
import BoxComponent from 'components/utility/box';
import WithDirection from 'settings/withDirection';
import { borderRadius } from 'settings/style-util';

const BoxWrapper = styled(BoxComponent)`
  .isoNewsTableBtn {
    display: flex;
    margin-bottom: 20px;
    a {
      margin-left: auto;
    }
  }
  
  .messageContent {
    display: inline-block;
    font-size: 13px;
  }
  
  .rowStyle {
    width: 100%;
    display: flex;
    flexFlow: row wrap;
  }
  
  .colStyle {
    marginBottom: 16px;
  }
  
  .filter-select {
    min-width: 120px;
  }
  
  .isoTableSearchBox {
    display: flex;
    
    .ant-input {
      border-radius: 3px 0 0 3px;
    }
    .ant-btn {
      border-radius: 0 3px 3px 0;
    }
  }
  
  .news-assets .news-assets__item,
  .news-categories__item {
    padding-bottom: 5px;
    padding-right: 5px;
    display: inline-block;
  }

  .news-assets .news-assets__item > span,
  .news-categories__item span {
    background-color: #FAFAFA;
    color: #747474;
    padding: 3px 5px;
    border: 1px solid #D9D9D9;
    border-radius: 3px;
  }

  
  .isoDataWrapper {
    display: flex;
    align-items: center;
    padding-right: 40%;
  }
  .isoEditIcon {
      margin: ${props => (props['data-rtl'] === 'rtl' ? '0 auto 0 0' : '0 0 0 auto')};
      cursor: pointer;
      flex-shrink: 0;
      padding-right: 40px;
    }
  .isoEditDataWrapper {
    display: flex;
    align-items: center;

    .ant-select {
      width: 100%;
      margin-right: 10px;
    }
    .isoEditIcon {
      cursor: pointer;
    }
  }
  .isoLabelIndicatorColor {
      width: 10px;
      height: 10px;
      display: flex;
      margin: ${props => (props['data-rtl'] === 'rtl' ? '0 5px 0 0' : '0 0 0 5px')};
      ${borderRadius('50%')};
    }
  .isAvailable {
    background: rgb(116, 180, 155);
  }
  .isNotAvailable {
    background: rgb(205, 49, 49);
  }
  .statusRow {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

  .isoEditData .statusRow {
    justify-content: flex-start;
  }

  .isoEditData .statusRow .isoEditIcon {
    margin-left: 10px;
  }
`;

const StatusTag = styled.span`
  padding: 0 5px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  background-color: ${palette('primary', 0)};
  font-size: 12px;
  color: #ffffff;
  text-transform: capitalize;

  &.admin {
    background-color: ${palette('primary', 0)};
  }
  &.news, &.active {
    background-color: ${palette('success', 0)};
  }
  &.registered {
    background-color: ${palette('warning', 0)};
  }
  &.blocked {
    background-color: ${palette('error', 0)};
  }
`;

const CardWrapper = styled.div`
  width: auto;
  overflow: inherit;
  position: relative;
  padding: 0px;

  .isoNewsTable {
    table {
      tbody {
        tr {
          td {
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
            
            .isoNewsBtnView {
              > a {
                margin: ${props => (props['data-rtl'] === 'rtl' ? '0 0 0 15px' : '0 15px 0 0')};
              }
            }
          }
        }
      }
    }
  }
  .newsListTable {
    .ant-dropdown .ant-table-selection-menu li:nth-child(2n) {
       border-bottom: ${props => (props.layout ? '0' : '1px solid #e9e9e9')};
    }

    .ant-dropdown-menu-item,
    .ant-dropdown-menu-submenu-title {
      &:hover {
        background-color: ${palette('secondary', 1)};
      }
    }

    .newsViewBtn {
      color: ${palette('text', 3)};

      &:hover {
        color: ${palette('primary', 0)};
      }
    }

    .newsDltBtn {
      font-size: 18px;
      border: 0;
      color: ${palette('error', 0)};

      &:hover {
        border: 0;
        color: ${palette('error', 2)};
      }
    }
  }
  
  .paginationWrap {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 20px;
  }

  .news__link {
    white-space: pre-wrap;
  }
`;

const Box = WithDirection(BoxWrapper);
export { Box, StatusTag };
export default WithDirection(CardWrapper);
