import styled from 'styled-components/';
import { palette } from 'styled-theme';
import BoxComponent from 'components/utility/box';
import WithDirection from 'settings/withDirection';
import { borderRadius } from 'settings/style-util';

const BoxWrapper = styled(BoxComponent)`
  .isoLinkTableBtn {
    display: flex;
    margin-bottom: 20px;
    
    .addLinkBtn {
      margin-left: auto;
    }
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
  .isoDataWrapper {
    display: flex;
    align-items: center;
    padding-right: 40%;
  }
  .isoEditIcon {
      margin: ${props =>
  props['data-rtl'] === 'rtl' ? '0 auto 0 0' : '0 0 0 auto'};
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
    justify-content: flex-start;
    
    .isoEditIcon {
      margin-left: 10px;
    }
  }
  .editIcon {
    font-size: 30px;
  }

  .links{
    &__item {
      white-space: pre-wrap;
    }
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
  &.links, &.active {
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
  .isoAssetTable {
    table {
      tbody {
        tr {
          td {
            .isoAssetBtnView {
              display: flex;
              flex-direction: row;
              > a {
                margin: ${props =>
                  props['data-rtl'] === 'rtl' ? '0 0 0 15px' : '0 15px 0 0'};
              }
            }
          }
        }
      }
    }
  }
  
  .paginationWrap {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 20px;
  }

  .linksListTable {
    .ant-dropdown-menu-item,
    .ant-dropdown-menu-submenu-title {
      &:hover {
        background-color: ${palette('secondary', 1)};
      }
    }
    
     .ant-dropdown .ant-table-selection-menu li:nth-child(2) {
       border-bottom: 1px solid #e9e9e9;
     }

    .linksViewBtn {
      color: ${palette('text', 3)};

      &:hover {
        color: ${palette('primary', 0)};
      }
    }

    .linksDltBtn {
      font-size: 18px;
      border: 0;
      color: ${palette('error', 0)};

      &:hover {
        border: 0;
        color: ${palette('error', 2)};
      }
    }
  }
`;

const Box = WithDirection(BoxWrapper);
export { Box, StatusTag };
export default WithDirection(CardWrapper);
