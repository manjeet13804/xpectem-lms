import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const FileBlockWrapper = styled.div`
   .block {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      color: ${COLORS.black};
    
      &__title {
        font-weight: 500;
        font-size: 19px;
        line-height: 22px;
      }
      
      &__file {
        display: flex;
        flex-direction: row;
        margin-top: 10px;
        
        &-title {
          font-weight: normal;
          font-size: 14px;
          margin-left: 8px;
          cursor: pointer;
        }
      }
  }
`;

export default WithDirection(FileBlockWrapper);
