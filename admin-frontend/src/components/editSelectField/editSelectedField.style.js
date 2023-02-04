import styled from 'styled-components';
import WithDirection from 'settings/withDirection';

const WDEditSelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  
  .rightSideIcon {
    display: flex;
    align-items: center;
    color: #9e9e9e;
    font-size: 15px;
    cursor: pointer;
  }
  
  .isoEditData {
    .isoEditIcon {
      padding-right: 10px;
    }
  }
  
  .isoEditData {
    display: flex;
    align-items: center;
  }
`;

const EditSelectWrapper = WithDirection(WDEditSelectWrapper);

export { EditSelectWrapper };
