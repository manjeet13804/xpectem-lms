import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const TextFormatWrapper = styled.div`
  display: flex;
  flex: 1;
  min-width: 240px;
  padding-left: 12px;
  background-color: ${COLORS.greyBGElement};
  padding-top: 5px;
  padding-bottom: 5px;

  .title-dropdown {

    &__caret {
      margin-left: -15px;
      pointer-events: none;
    }
    
    &__select {
      padding: 0px !important;
      outline: none !important;
      appearance: none !important;
      border:none !important;
      background-image:none !important;
      background-color:transparent !important;
      -webkit-box-shadow: none !important;
      -moz-box-shadow: none !important;
      box-shadow: none !important;
      color: ${COLORS.greyInput} !important;
      font-size: 16px !important;
      line-height: 28px !important;
      display: flex !important;
      align-items: center;

      .dropdown, 
      .icon {
        padding: 0px !important;
        padding-top: 15px !important;
        color: ${COLORS.black} !important;
        margin-right: -20px !important;
      }
    }
    
    &__option {
    
    }  
  }
`;

export default WithDirection(TextFormatWrapper);
