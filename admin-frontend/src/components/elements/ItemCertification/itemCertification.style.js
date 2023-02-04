import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const ItemCertificationWrapper = styled.div`
  .item-certification {
    height: 45px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: ${COLORS.greyOrg};
    color: ${COLORS.grayDove};
    margin: 2px 0; 
    padding: 0 15px;
    
    &__modal {
      .ant-modal-close-x {
        display: none;
      }
    }
    
    &_reserve {
      background-color: ${COLORS.greenLight};
    }
    
    &__text {
      display: flex;
      flex-direction: row;
      
      &-city {
        margin-right: 5px;
      }
      
      &-reserve {
        margin-left: 5px;
      }
    }
  }
`;

export default WithDirection(ItemCertificationWrapper);
