import styled from 'styled-components';
import Modal from './modal';
import WithDirection from '../../settings/withDirection';

const ModalWrapper = styled(Modal)`
   
   @media (max-width: 767px) {
     &.ant-modal {
      margin-left: 15%;
      width:  fit-content;
     }
   }
  
  .ant-modal-close-x {
     display: none;
   }

  .ant-modal-content {
    overflow: hidden;
    width: fit-content;

    .ant-modal-header {
      display: none;
    }

    .ant-modal-body {
      padding: 0px;
    }
  }
`;

export default WithDirection(ModalWrapper);
