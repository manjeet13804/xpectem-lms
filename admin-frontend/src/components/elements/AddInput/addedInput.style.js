import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';
import { transition, borderRadius, boxShadow } from 'settings/style-util';

const AdministratorsAddWrapper = styled.div`
  .add-input {
    margin-top: 14px;
    &__title {
      font-size: 12px;
      line-height: 16px;
      color: ${COLORS.black};
    }
    &__input {
      font-size: 16px;
      line-height: 28px;
      margin-top: 7px;
      padding-left: 5px;
      outline: none;
      border: none;
      color: ${COLORS.greyInput};
      &_error {
        ${transition()}
        ${boxShadow()}
        border: 1px solid ${COLORS.redPomegranate};
        ${borderRadius('3px')};
      }
    }
    &__add {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 7px;
      outline: none;
      border: none;
      cursor: pointer;
      &-title {
        margin-left: 5px;
      }
    }
    
    &__remove-btn {
       cursor: pointer;
       border: 0;
       background-color: transparent;
       height: 32px;
       margin-top: 5px;
       
       &:focus {
         outline: none;
       }
       
       .icon {
         font-size: 20px;
       }
    }
    
    &__input-wrapper {
        display: flex;
    }
`;

export default WithDirection(AdministratorsAddWrapper);
