import styled from 'styled-components';
import { palette } from 'styled-theme';
import { transition, borderRadius, boxShadow } from 'settings/style-util';
import WithDirection from 'settings/withDirection';

const WDAssetTeamsWrapper = styled.div`
  padding: 50px 35px;
  display: flex;
  background: 'none';
  max-height: 700px;
  
  ${''} @media only screen and (max-width: 767px) {
    padding: 50px 20px;
    flex-direction: column;
    height: auto;
  }
  
  .ant-list {
    padding-left: 10px;
  }
  
  .isoContactCard {
    padding-top: 20px;
  }
  
  .isoContactCard {
    .isoContactCardHead {
      .isoPersonImage {
        margin-top: 15px;
        position: relative;
        width: 135px;
        height: auto;
        flex-direction: column;
        border-radius: 0;
        
        img {
          border-radius: 5px;
        }
        
        .editMemberBtn {
          margin-top: 10px;
          cursor: pointer;
        }
      }
    }
  }
  
  .isoContactBox {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;

    .isoNoMailMsg {
      font-size: 28px;
      font-weight: 300;
      text-transform: capitalize;
      color: ${palette('text', 2)};
      text-align: center;
      width: 100%;
      height: 100%;
      min-height: calc(100vh - 400px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media only screen and (min-width: 767px) and (max-width: 990px) {
    padding: 40px 30px;
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
  
  .formInput {
    width: 100%;
  }
  
  .linksContainer {
    display: flex;
    flex-direction: row;
    justify-content: start;
    padding-bottom: 15px;
    
    .formInput {
      margin-right: 20px;
      width: 30%;
    }
  }
  
  .links-label {
    color: rgba(0, 0, 0, 0.85);
    padding: 9px 0px;
  }
  
  .isoContactListBar {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    background: #ffffff;
    border: 1px solid ${palette('border', 0)};
    width: 320px;
    overflow: hidden;
    overflow-y: auto;

    @media only screen and (max-width: 767px) {
      width: auto !important;
      margin-bottom: 20px;
      min-width: 0 !important;
      max-width: 100% !important;
      flex: 0 !important;
    }

    @media only screen and (min-width: 767px) and (max-width: 990px) {
      width: 270px !important;
      flex: 0 0 270px !important;
    }
  }

  .isoContactBoxWrapper {
  .avatar {
    border-radius: 5px;
  }
    width: 100%;
    display: flex;
    justify-content: flex-start;
    background-color: #ffffff;
    border: 1px solid ${palette('border', 0)};
    border-left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
    border-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
    position: relative;

    .isoContactBox {
      width: 100%;
      height: 100%;
    }

    .contactBoxScrollbar {
      height: calc(100vh - 225px);
    }

    .isoContactControl {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-shrink: 0;
      padding: 30px;
      background-color: #ffffff;

      @media only screen and (max-width: 767px) {
        padding: 30px 20px;
      }

      button:not(.isoAddContactBtn) {
        font-size: 16px;
        color: ${palette('secondary', 0)};
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        background-color: #ffffff;
        outline: 0;
        padding: 0;
        border: 1px solid ${palette('border', 0)};
        margin-left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '-1px')};
        margin-right: ${props => (props['data-rtl'] === 'rtl' ? '-1px' : 'inherit')};
        cursor: pointer;
        ${borderRadius()};
        ${transition()};

        i {
          width: 100%;
        }

        span {
          display: none;
        }

        &:first-child {
          margin-left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
          margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
        }

        &:hover {
          color: ${palette('primary', 0)};
          background-color: ${palette('grayscale', 7)};
        }
      }

      .isoAddContactBtn {
        background-color: ${palette('primary', 0)};
        border: 0;
        height: 30px;
        padding: 0 15px;
        margin-left: 25px;
        margin-right: 'inherit';
        ${borderRadius('3px')};
        ${transition()};

        span {
          font-size: 12px;
          font-weight: 400;
          padding: 0;
          text-transform: uppercase;
          color: #ffffff;
        }

        &:hover {
          background-color: ${palette('primary', 1)};
        }
      }
    }
  }

  .isoAssetTableBtn {
    display: flex;
    margin-bottom: 20px;
    button {
      margin-left: auto;
    }
  }
  .PageHeader {
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-flow: row wrap;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap;
    -webkit-align-items: flex-end;
    -webkit-box-align: flex-end;
    -ms-flex-align: flex-end;
    align-items: flex-end;
    -webkit-box-pack: justify;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: justify;
    justify-content: flex-end;
    margin-bottom: 30px;

    a {
      text-decoration: none;
    }
    .isoGoInvoBtn {
      margin-right: 15px;
    }
    .isoInvoPrint {
      background: ${palette('blue', 14)};
      margin: ${props => (props['data-rtl'] === 'rtl' ? '0 15px 0 0' : '0 0 0 15px')};
      @media (max-width: 500px) {
        margin-top: 15px;
      }

      @media (max-width: 485px) {
        margin: 0;
        margin-top: 15px;
      }
    }
    .saveBtn {
      background: ${palette('blue', 14)};
      margin: ${props => (props['data-rtl'] === 'rtl' ? '0 15px 0 0' : '0 0 0 15px')};
    }
  }
  
  .ant-form-item {
    margin-bottom: 5px;
  }
 
  .PageContent {
    .isoRecipentsImg {
      width: 48px;
      height: 48px;
      display: -webkit-inline-flex;
      display: -ms-inline-flex;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      flex-shrink: 0;
      ${borderRadius('50%')};

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    span {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${palette('color', 4)};
      font-size: 16px;
      font-weight: 300;
      color: #fff;
      letter-spacing: 1px;
    }
  }
  
    .AssetInfo {
      width: 100%;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-flow: row wrap;
      -ms-flex-flow: row wrap;
      flex-flow: row wrap;
      -webkit-align-items: baseline;
      -webkit-box-align: baseline;
      -ms-flex-align: baseline;
      align-items: baseline;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: space-between;
      padding-bottom: 20px;
      border-bottom: 1px dashed ${palette('grayscale', 2)};
      
      .RegDateLabel {
        font-weight: bold;
      }

      @media (max-width: 560px) {
        flex-direction: column;
      }

      .Title {
        font-size: 16px;
        font-weight: 500;
        color: ${palette('grey', 8)};
        margin: 0 0 20px;
        line-height: 1;
      }

      span.InvoiceNumber {
        font-size: 16px;
        font-weight: 400;
        color: ${palette('blue', 11)};
        margin: 0;
      }

      .RightSideContent {
        display: flex;
        flex-direction: column;

        @media (max-width: 769px) {
          align-items: flex-start;
        }

        @media (max-width: 560px) {
          margin-top: 30px;
        }

        p {
          font-size: 14px;
          color: ${palette('grey', 8)};
          margin: 0 0 15px;
          font-weight: 500;

          span.orderStatus {
            margin-left: ${props => (props['data-rtl'] === 'rtl' ? '0 8px 0 0' : '0 0 0 8px')};
            font-weight: 400;
          }
          span.orderDate {
            font-weight: 400;
            margin-left: ${props => (props['data-rtl'] === 'rtl' ? '0 8px 0 0' : '0 0 0 8px')};
          }

          &:last-child {
            margin: 0;
          }
          .orderStatusSpan {
            font-size: 14px;
            color: ${palette('grey', 8)};
            margin: 0 0 15px;
            font-weight: 500;
          }
          .orderDateSpan {
            font-size: 14px;
            color: ${palette('grey', 8)};
            margin: 0 0 15px;
            margin-left: ${props => (props['data-rtl'] === 'rtl' ? '0 13px 0 0' : '0 0 0 13px')};
            font-weight: 500;

            @media (max-width: 420px) {
              margin: 0;
            }
          }
        }
        .RightSideStatus {
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 14px;
          color: ${palette('grey', 8)};

          @media (max-width: 560px) {
            margin-bottom: 10px;
          }

          .RightSideStatusSpan {
            margin: ${props => (props['data-rtl'] === 'rtl' ? '0 -10px 0 7px' : '0 7px 0 -10px')};

            @media (max-width: 560px) {
              margin: ${props => (props['data-rtl'] === 'rtl' ? '0 0 0 10px' : '0 10px 0 0')};
            }
          }
          #order-drop-list {
            z-index: 1;
          }
        }
        .RightSideDate {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 15px;
          font-size: 14px;
          color: ${palette('grey', 8)};
          > span {
            margin: ${props => (props['data-rtl'] === 'rtl' ? '0 10px 0 0' : '0 0 0 10px')};
          }

          @media (max-width: 560px) {
            margin: ${props => (props['data-rtl'] === 'rtl' ? '0 13px 0 0' : '0 0 0 13px')};
          }

          > div {
            margin: ${props => (props['data-rtl'] === 'rtl' ? '0 7px 0 0' : '0 0 0 7px')};
            > div {
              &::before {
                background-color: #ececec;
              }
            }
          }
        }
      }
      .LeftSideContent {
        .LeftSideContentInput {
          > div {
            &::before {
              background-color: #ececec;
            }
          }
        }
      }
    }
    
    .AssetInformation {
      width: 100%;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-flow: row wrap;
      -ms-flex-flow: row wrap;
      flex-flow: row wrap;
      -webkit-align-items: baseline;
      -webkit-box-align: baseline;
      -ms-flex-align: baseline;
      align-items: baseline;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: space-between;
      margin-top: 20px;
      margin-bottom: 60px;
      padding: 0 35px;
       
      .LeftSideContent {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: flex-start;
      -webkit-box-align: flex-start;
      -ms-flex-align: flex-start;
      align-items: flex-start;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      &.LeftSideContentInput {
        > div {
          &::before {
            background-color: #ececec;
          }
        }
      }
    }
    .wideContent {
      width: 100%;
    }
    
    .RightSideContent {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: flex-start;
      -webkit-box-align: flex-start;
      -ms-flex-align: flex-start;
      align-items: flex-start;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      text-align: left;
      
      .formInput {
        text-align: left;
        width: 100%;
        
        input {
          text-align: left;
        }
      }
 
      @media only screen and (max-width: 767px) {
        -webkit-align-items: flex-start;
        -webkit-box-align: flex-start;
        -ms-flex-align: flex-start;
        align-items: flex-start;
        text-align: left;
      }

      @media only screen and (min-width: 501px) and (max-width: 767px) {
        -webkit-align-items: flex-start;
        -webkit-box-align: flex-start;
        -ms-flex-align: flex-start;
        align-items: flex-start;
        text-align: left;
      }
    }
      
      .AssetFormLabel {
        font-size: 16px;
        font-weight: bold;
        padding-bottom: 10px;
      }
      .LeftSideContent,
      .RightSideContent {
        margin: ${props => (props['data-rtl'] === 'rtl' ? '0 0 0 10px' : '0 10px 0 0')};

        @media (max-width: 500px) {
          width: 100%;
          margin: 0;
        }
      }
      .RightSideContent {
        margin: 0;
        width: calc(80% - 50px);
      }
      .LeftSideContent {
        margin: 0;
        width: calc(20% - 50px);
        
        .avatar-uploader {
          width: 120px;
          height: 120px;
    
          .avatar {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
      }
      @media only screen and (max-width: 767px) {
        .RightSideContent {
          margin-top: 40px;
        }
      }
      
      h3.Title,
      .AssetFormInput {
        font-size: 16px;
        font-weight: 500;
        color: ${palette('grey', 9)};
        margin: 0 0 10px;
        line-height: 1;
        label {
          font-size: 19px;
          font-weight: 500;
          color: ${palette('grey', 9)};
          margin: 0 0 10px;
          line-height: 1;
        }
        > div {
          &::before {
            background-color: #ececec;
          }
        }
        input {
          font-size: 15px;
          color: ${palette('grey', 7)};
          font-weight: 400;
          display: block;
          margin-top: 10px;
        }
      }
      .BillFormAddress {
        width: 100%;
        > div {
          &::before {
            background-color: #ececec;
          }
        }
        textarea {
          height: 100%;
          overflow: hidden;
          font-size: 14px;
          color: ${palette('grey', 7)};
          font-weight: 300;
          font-style: normal;
        }
        textarea.ant-input {
          min-height: 160px !important;
        }
      }
      p.NameEmail {
        span.Name {
          font-size: 15px;
          color: ${palette('grey', 7)};
          font-weight: 400;
          display: block;
        }

        span.Email {
          font-size: 14px;
          color: ${palette('grey', 7)};
          font-weight: 300;
        }
      }

      address {
        font-size: 14px;
        color: ${palette('grey', 7)};
        font-weight: 300;
        font-style: normal;
      }
    }
    .customScrollBar {
      .scrollbar-thumb {
        &.scrollbar-thumb-y {
          display: none !important;
        }
      }
    }
    .InvoiceTable {
      table {
        thead {
          background-color: ${palette('grey', 2)};
          tr {
            th {
              color: ${palette('grey', 8)};
            }
          }
        }

        tbody {
          tr {
            td {
              color: ${palette('grey', 7)};
              > div {
                > div {
                  &::before {
                    background-color: #ececec;
                  }
                }
              }
              input {
                color: ${palette('grey', 7)};
                font-size: 0.8125rem;
              }
              .material-icons {
                color: #757575;
              }
            }
          }
        }
      }
      .InvoiceTableBtn {
        display: flex;
        justify-content: ${props => (props['data-rtl'] === 'rtl' ? 'flex-start' : 'flex-end')};
        align-items: ${props => (props['data-rtl'] === 'rtl' ? 'flex-start' : 'flex-end')};
        margin-top: 15px;
        .InvoiceEditAddBtn {
          background: ${palette('blue', 14)};
          color: #fff;
        }
      }
      .TotalBill {
        margin-top: 30px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        width: 100%;
        align-items: ${props => (props['data-rtl'] === 'rtl' ? 'flex-start' : 'flex-end')};
        text-align: ${props => (props['data-rtl'] === 'rtl' ? 'left' : 'right')};
        flex-direction: column;
        padding-left: inherit;

        p {
          margin-top: 0;
          font-size: 14px;
          color: ${palette('grey', 7)};
          margin-bottom: 15px;
          width: 250px;
          display: flex;
          justify-content: ${props => (props['data-rtl'] === 'rtl' ? 'flex-start' : 'flex-end')};
          text-align: ${props => (props['data-rtl'] === 'rtl' ? 'left' : 'right')};

          span {
            width: 120px;
          }
        }
        .TotalBillTitle {
          margin: ${props => (props['data-rtl'] === 'rtl' ? '0 0 0 -10px' : '0 -10px 0 0')};
        }
        .totalVat {
          width: 186px;
        }
        .vatRateCalc {
          > div {
            margin-top: -12px;
            width: 25px;
            margin: ${props => (props['data-rtl'] === 'rtl' ? '0 15px 0 0' : '0 0 0 15px')};
            > div {
              &::before {
                background-color: #ececec;
              }
            }
          }
          input {
            color: ${palette('grey', 7)};
            font-size: 14px;
          }
          > span {
            width: 70px;
            margin: ${props => (props['data-rtl'] === 'rtl' ? '-7px 10px 0 0' : '-7px 0 0 10px')};
          }
          .ant-input-group-wrapper {
            width: auto;
            margin: ${props => (props['data-rtl'] === 'rtl' ? '-7px 0 0 0' : '-7px 0 0 0')};
          }
          .vatRateCalcWrap {
            > span:last-child {
              margin: ${props => (props['data-rtl'] === 'rtl'
    ? '-7px 10px 0 0'
    : '-7px 0 0 10px')};
            }
          }
          .ant-input-wrapper.ant-input-group {
            margin: ${props => (props['data-rtl'] === 'rtl' ? '0 -22px 0 0' : '0 0 0 -22px')};
            margin-top: 0;
            input.ant-input {
              width: 50px;
            }
          }
        }
        .currencySign {
          > div {
            &::before {
              background-color: #ececec;
            }
          }
          input,
          label {
            color: ${palette('grey', 7)};
            font-size: 14px;
          }
        }
        h3 {
          font-size: 18px;
          color: ${palette('grey', 9)};
          margin: 0;
          font-weight: 400;
          width: 250px;
          display: flex;
          justify-content: ${props => (props['data-rtl'] === 'rtl' ? 'flex-start' : 'flex-end')};
          text-align: ${props => (props['data-rtl'] === 'rtl' ? 'left' : 'right')};

          span {
            width: 120px;
          }
        }
        .currencySignWithTotal {
          span {
            width: 100%;
          }
          .currencySign {
            margin: ${props => (props['data-rtl'] === 'rtl' ? '0 10px 0 0' : '0 0 0 10px')};
            width: 50px;
            margin-top: -5px;
          }
          .currencySignSpan {
            width: 120px;
          }
        }
        .grandTotal {
          margin-top: 15px;
        }
      }
      &.editInvoiceTable {
        table {
          @media (max-width: 767px) {
            width: 760px;
          }
          thead {
            background-color: ${palette('secondary', 1)};
            tr {
              th {
                color: ${palette('secondary', 2)};
              }
            }
          }

          tbody {
            tr {
              td {
                color: ${palette('text', 1)};
                border-bottom: 0;
                padding: 8px 15px;
                > div {
                  > div {
                    &::before {
                      background-color: #ececec;
                    }
                  }
                }
                input {
                  color: ${palette('text', 1)};
                  font-size: 0.8125rem;
                  height: 28px;
                }
                .material-icons {
                  color: #757575;
                }
              }
            }
          }
        }
        .TotalBill {
          p {
            width: 300px;
            justify-content: ${props => (props['data-rtl'] === 'rtl' ? 'flex-start' : 'flex-end')};
            text-align: ${props => (props['data-rtl'] === 'rtl' ? 'left' : 'right')};
            span {
              width: 50%;
            }
            span.TotalBillTitle {
              margin-right: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
              margin-left: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
            }
          }
          .vatRateCalc {
            width: 300px;
            display: flex;
            justify-content: ${props => (props['data-rtl'] === 'rtl' ? 'flex-end' : 'flex-start')};
            .vatRateCalcSpan {
              width: 50%;
            }
            .vatRateCalcWrap {
              width: 50%;
              margin-top: -5px;
              margin-left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
              margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
              .ant-input-wrapper.ant-input-group {
                margin-left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
                margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
              }
            }
          }
          .currencySignWithTotal {
            width: 300px;
            display: flex;
            justify-content: ${props => (props['data-rtl'] === 'rtl' ? 'flex-end' : 'flex-start')};
            margin-top: 15px;
            .grandTotalSpan {
              width: 50%;
              font-size: 18px;
              font-weight: 500;
              color: rgba(0, 0, 0, 0.85);
            }
            .currencySignWrap {
              width: 50%;
              .currencySign {
                margin-left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
                margin-right: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
                width: 36px;
              }
              .currencySignSpan {
                margin-left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '15px')};
                margin-right: ${props => (props['data-rtl'] === 'rtl' ? '15px' : 'inherit')};
              }
            }
          }
        }
      }
    }

    .ButtonWrapper {
      width: 100%;
      display: flex;
      justify-content: ${props => (props['data-rtl'] === 'rtl' ? 'flex-start' : 'flex-end')};
      margin-top: 30px;
    }
    .mateInvoPrint {
      background: ${palette('blue', 14)};
      margin-left: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '15px')};
      margin-right: ${props => (props['data-rtl'] === 'rtl' ? '15px' : 'inherit')};
    }
  }
  
  .isoContactCardHead {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 120px;
    flex-shrink: 0;
    margin-right: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '50px')};
    margin-left: ${props => (props['data-rtl'] === 'rtl' ? '50px' : 'inherit')};
    flex-shrink: 0;
    
    @media only screen and (max-width: 600px) {
      margin-bottom: 20px;
    }

    @media only screen and (min-width: 767px) and (max-width: 990px) {
      margin-bottom: 20px;
    }

    .isoPersonName {
      font-size: 15px;
      font-weight: 500;
      color: ${palette('text', 0)};
      line-height: 1.5;
      margin: 0;
    }
  }

  .isoContactInfoWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;

    @media only screen and (max-width: 767px) {
      padding: 20px 0;
    }
   
    .isoContactCardInfos {
      width: 100%;
      display: flex;
      flex-shrink: 0;
      align-items: baseline;
      flex-direction: row;
      margin-bottom: 15px;

      @media only screen and (max-width: 430px) {
        flex-direction: column;
        margin-bottom: 20px;
      }

      .isoInfoLabel {
        font-size: 14px;
        font-weight: 500;
        color: ${palette('text', 0)};
        line-height: 1.5;
        margin: 0;
        margin-right: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '15px')};
        margin-left: ${props => (props['data-rtl'] === 'rtl' ? '15px' : 'inherit')};
        text-align: ${props => (props['data-rtl'] === 'rtl' ? 'right' : 'left')};
        min-width: 80px;
        position: relative;

        @media only screen and (max-width: 430px) {
          margin-bottom: 5px;
          margin-right: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
          margin-left: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
          padding-right: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '10px')};
          padding-left: ${props => (props['data-rtl'] === 'rtl' ? '10px' : 'inherit')};
          min-width: 0;
        }

        &::after {
          content: ':';
          position: absolute;
          right: ${props => (props['data-rtl'] === 'rtl' ? 'inherit' : '0')};
          left: ${props => (props['data-rtl'] === 'rtl' ? '0' : 'inherit')};
        }
      }

      .isoInfoDetails {
        font-size: 14px;
        font-weight: 400;
        color: ${palette('text', 2)};
        line-height: 1.5;
        margin: 0;
        text-align: ${props => (props['data-rtl'] === 'rtl' ? 'right' : 'left')};
      }

      input {
        font-size: 14px;
        font-weight: 400;
        color: ${palette('text', 2)};
        line-height: inherit;
        height: 36px;
        padding: 0 15px;
        margin: 0;
        border: 1px solid ${palette('border', 0)};
        outline: 0 !important;
        overflow: hidden;
        background-color: #ffffff;
        ${boxShadow('none')};
        ${borderRadius('3px')};
        ${transition()};

        &:focus {
          border-color: ${palette('primary', 0)};
          ${boxShadow('0 0 0 2px rgba(68, 130, 255, 0.2)')};
          outline: 0;
        }

        &:hover {
          border-color: ${palette('primary', 0)};
        }

        &::-webkit-input-placeholder {
          color: ${palette('grayscale', 0)};
        }

        &:-moz-placeholder {
          color: ${palette('grayscale', 0)};
        }

        &::-moz-placeholder {
          color: ${palette('grayscale', 0)};
        }
        &:-ms-input-placeholder {
          color: ${palette('grayscale', 0)};
        }
      }

      textarea {
        font-size: 14px;
        font-weight: 400;
        color: ${palette('text', 2)};
        line-height: 24px;
        height: 210px;
        padding: 10px 15px;
        margin: 0;
        border: 1px solid ${palette('border', 0)};
        outline: 0 !important;
        background-color: #ffffff;
        ${boxShadow('none')};
        ${borderRadius('3px')};
        ${transition()};

        &:focus {
          border-color: ${palette('primary', 0)};
          ${boxShadow('0 0 0 2px rgba(68, 130, 255, 0.2)')};
          outline: 0;
        }

        &:hover {
          border-color: ${palette('primary', 0)};
        }

        &::-webkit-input-placeholder {
          color: ${palette('grayscale', 0)};
        }

        &:-moz-placeholder {
          color: ${palette('grayscale', 0)};
        }

        &::-moz-placeholder {
          color: ${palette('grayscale', 0)};
        }
        &:-ms-input-placeholder {
          color: ${palette('grayscale', 0)};
        }
      }
    }
  }
`;

const AssetTeamsWrapper = WithDirection(WDAssetTeamsWrapper);

export { AssetTeamsWrapper };
