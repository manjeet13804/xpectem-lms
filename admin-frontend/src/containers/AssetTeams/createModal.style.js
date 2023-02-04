import styled from 'styled-components';
import WithDirection from 'settings/withDirection';

const WDCreateModalWrapper = styled.div`
  .dynamic-delete-button:hover {
    color: #777;
  }
  
  .dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  .dynamic-delete-button {
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all .3s;
  }
  
  .formInput {
    width: 100%;
  }
  
  .ant-form-explain {
    color: #f5222d;
  }
  
  .ant-form-item-control {
    .ant-input.formInput {
      width: 200px;
    }
  }
  
  .linksContainer {
    display: flex;
    flex-direction: row;
    justify-content: start;
      
    .formInput {
      margin-right: 20px;
      width: 30%;
    }
  }
`;

const CreateModalWrapper = WithDirection(WDCreateModalWrapper);

export { CreateModalWrapper };
