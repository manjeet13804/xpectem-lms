import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const ExampleCsvWrapper = styled.div`
  .example-csv {
    margin-top: 32px;
    
    &__title {
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      letter-spacing: 0.15px;
    }
    
    &__table {
      display: flex;
      flex-direction: column; 
      overflow-y: auto;
    }
    
    &__header {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 37px;
      background-color: ${COLORS.greyBGElement};
      font-weight: bold;
      font-size: 16px;
      line-height: 28px;
      color: ${COLORS.black};
      margin-top: 24px;
      padding-left: 12px;
    }
    
    &__row {
      display: flex;
      flex-direction: row;
      min-height: 33px;
      font-weight: normal;
      font-size: 16px;
      line-height: 28px;
      margin-top: 5px;
      padding-left: 12px;
    }
    
    &__column {
      flex: 1;
      min-width: 140px;
      margin-left: 16px;
      &:last-child {
        flex: 2;
        min-width: 200px;
        padding-right: 12px;
      }
    }
  }
`;

export default WithDirection(ExampleCsvWrapper);
