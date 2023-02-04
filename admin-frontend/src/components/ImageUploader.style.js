import styled from 'styled-components';

const ImageUploaderWrapper = styled.div`
  border-radius: 4px;
  border: 1px dashed;
  border-color: #ccc;
  display: inline-block;
  overflow: hidden;
  padding: 4px;
  background-color: #f7f7f7;
  
  &:hover {
    border-color: #1890ff;
  }

  .preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 3px;
    cursor: pointer;

    .overlay {
      border-radius: 3px;
      width: ${props => props.width}px;
      height: ${props => props.height}px;
        font-size: 14px;
      text-align: center;
      line-height: 22px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      
      span {
        color: #666;
      }
      
      .image-button {
          outline: none;
          display: flex;
          flex-direction: column;
        }
        
        .image-delete-button {
          padding-top: 10px;
        }

      &.drag-over {
        i, span { display: inline; color: #fff; }
        background-color: rgba(0, 0, 0, 0.5);
      }

      &.has-image {
        i, span { display: none; }
        &:hover {
          i, span { display: inline; color: #fff; }
          background-color: rgba(0, 0, 0, 0.5);
        }
        
        
      }
    }
  }

  &.circle .preview {
    border-radius: 50%;
  }

  .error {
    color: #f5222d;
    position: absolute;
    line-height: 15px;
    font-size: 14px;
    margin-top: 10px;    
  }
`;

export default ImageUploaderWrapper;
