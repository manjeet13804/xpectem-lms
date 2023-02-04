import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const OrganisationsAddWrapper = styled.div`
  .button {
    display: flex;
    justify-content: flex-end;
    margin-top: 32px;
    align-items: center;
    cursor: pointer;
    
    &__add {
     height: 100%;
     cursor: pointer;
     min-height: 40px;
     min-width: 140px;
     width: auto;
     font-weight: bold;
     background-color: ${COLORS.defaultButtonColor};
     border-radius: 4px;
     color: ${COLORS.black};
     border: none !important;
     outline: none;
     font-size: 14px;
     
      &_delete {
        background-color: ${COLORS.redPomegranate} !important;
        color: ${COLORS.white} !important;
        border: 0;
        height: 100%;
        min-width: 140px;
        width: auto;
        font-weight: bold;
        border-radius: 4px;
        margin-right: 20px;
      }
     
      &:disabled {
        opacity: 0.5;
        cursor: default;
      }
    }
  }
`;

export default WithDirection(OrganisationsAddWrapper);
