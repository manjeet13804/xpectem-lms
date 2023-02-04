import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const NotesWrapper = styled.div`
  @media only screen and (max-width: 767px) {
    margin-left: 12px;
  }
  
  .notes {
    background-color: ${COLORS.grey};
    margin-top: 12px;
    
    &__title {
      font-size: 21px;
      line-height: 20px;
      color: ${COLORS.black};
      margin-top: 5px;
    }
    
    &__edit {
      margin-top: 21px;
      
      &-text {
        font-weight: normal;
        font-size: 14px;
        line-height: 20px;
        width: 581px;
        height: 300px;
        border: none;
        resize: none
      }
    }
  }
  
  .button {
    display: flex;
    justify-content: flex-end;
    max-width: 581px;
    margin-top: 32px;
  
    &__save {
      width: 120px;
      height: 40px;
      border-radius: 4px;
      background-color: ${COLORS.grayAlto};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: ${COLORS.black};
      outline: none;
    }
  }
`;

export default WithDirection(NotesWrapper);
