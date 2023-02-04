import styled from 'styled-components';
import WithDirection from 'settings/withDirection';

const FilterTypeaheadWrapper = styled.div`
  .filterTypeahead {
    display: flex;
    align-items: center;
    width: 350px;
    padding: 20px;
    background-color: #fff;
    box-sizing: border-box;
    border: 1px solid #e9e9e9;
  }

  .filterTypeahead-select {
    flex: 0 0 65%;
    max-width: 65%;
    line-height: 1.5;
    font-size: 13px;
    justify-content: stretch;
  }

  .filterTypeahead-select .ant-select-selection {
    border-radius: 3px 0 0 3px;
  }

  .filterTypeahead-button {
    flex: 0 0 35%;
    max-width: 35%;
    align-self: flex-start;
    line-height: 1.5;
    font-size: 14px;
    border-radius: 0 3px 3px 0;
    background-color: #4482FF;
    color: #fff;
    border: none;
  }

  .filterTypeahead-button:hover {
    color: #fff;
    background-color: #1890ff;
  }

  .filterTypeahead-button:focus {
    background-color: #4482FF;
    color: #fff;
  }
`;

export default WithDirection(FilterTypeaheadWrapper);
