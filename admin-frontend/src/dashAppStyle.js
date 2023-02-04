import styled from 'styled-components';
import { palette, font } from 'styled-theme';

const DashAppHolder = styled.div`
  font-family: ${font('primary', 0)};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  p,
  li,
  input,
  textarea,
  span,
  div,
  img,
  svg {
    &::selection {
      background: ${palette('primary', 0)};
      color: #fff;
    }
  }
  
  .ant-row:not(.ant-form-item) {
    ${'' /* margin-left: -8px;
    margin-right: -8px; */};
    &:before,
    &:after {
      display: none;
    }
  }

  .ant-row > div {
    padding: 0;
  }

  .isoLeftRightComponent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .isoCenterComponent {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .isoEditData .isoEditDataWrapper .editableCell.invalid {
    border-color: red;
    outline: none;
  }

  .isoEditData .editableCell-validation-error > li {
    padding: 5px;
    color: red;
    font-size: 12px;
  }
  
  .ant-form-item {
    margin-bottom: 5px;
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
  
  .ql-editor {
    max-height: 240px;
    overflow: auto;
  }
  
  .ql-tooltip {
    margin-left: 150px;
   }
  
  .disabledButton {
    border-color: rgb(217, 217, 217) !important;
    background-color: #f5f5f5 !important;
    cursor: not-allowed;
    animation: 0s !important;
    
    i {
      color: rgba(0, 0, 0, 0.65) !important;
    }
  }
  .ant-avatar > img {
    object-fit: cover;
`;

export default DashAppHolder;
