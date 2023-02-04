import styled from 'styled-components';
import { palette } from 'styled-theme';
import WithDirection from 'settings/withDirection';

const SinglePageWrapper = styled.div`
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

    .saveBtn {
      background: ${palette('blue', 14)};
      margin: ${props => (props['data-rtl'] === 'rtl' ? '0 15px 0 0' : '0 0 0 15px')};
    }
  }
  
  .ant-form-item {
    margin-bottom: 5px;
  }

  .news-source-description {
    width: 100%;
    .ql-toolbar {
      display: flex;
      align-items: center;
      .ql-header  {
        line-height: 14px;
      }
    }
  }

  .PageContent {
    .Info {
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
      
      .HeadContainer {
        display: flex;
        justify-content: flex-start;
        
        .ant-form-item {
          padding-left: 15px;
          
          &:first-child {
            padding-left: 0;
          }
        }
      }
      
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
    }
    
    .colorPicker {
      box-shadow: none !important;
      border: 1px solid #ccc;
      .flexbox-fix {
        input, span { line-height: 12px; }
      }
    }

    .Information {
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
      
      .FormContainer {
        display: flex;
        flex-direction: row;
        width: 100%;
        
        .SwitchBox {
          display: flex;
          align-items: flex-end;
          padding-left: 15px;
          width: auto;
        }
      } 

      .wideContent {
        width: 100%;
      }
      
      .SourceClass {
        .ant-select-selection-selected-value {
          text-transform: capitalize;
        }
      }

      h3.Title,
      .FormInput {
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
    }

    .LeftSideContent,
    .RightSideContent {
      .child-wide > div {
        width: 100%;
      }
      width: calc(50% - 50px);
      margin: ${props => (props['data-rtl'] === 'rtl' ? '0 0 0 10px' : '0 10px 0 0')};

      @media (max-width: 500px) {
        width: 100%;
        margin: 0;
      }
    }

    .RightSideContent {
      margin: 0;
    }
    
    .ButtonWrapper {
      width: 100%;
      display: flex;
      justify-content: ${props => (props['data-rtl'] === 'rtl' ? 'flex-start' : 'flex-end')};
      margin-top: 30px;
    }

    .address {
      .ant-form-explain { background-color: #fff }
    }
    .FormContainer {
      &.Editor {
        flex-direction: column;
        margin-bottom: 20px;    
        .quill {
          height: 400px;
        
          .ql-editor {
            max-height: 100%;
            height: 100%;
          }
        
          .ql-container {
            height: 91%;
          }
        }
      }

      .withButton {
        .ant-form-item-children { 
          display: flex;
          flex-direction: row;
          *:first-child {
            border-right: none;
            border-top-right-radius: 0px;
            border-bottom-right-radius: 0px;
          }
          *:last-child {
            border-top-left-radius: 0px;
            border-bottom-left-radius: 0px;
          }
        }
      }
    }
  }
`;


export default WithDirection(SinglePageWrapper);
