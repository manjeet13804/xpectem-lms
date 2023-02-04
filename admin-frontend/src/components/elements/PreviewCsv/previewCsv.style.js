import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const PreviewCsvWrapper = styled.div`
  .preview-csv {
    margin-top: 32px;
    overflow: auto;
    
    &__title {
      font-weight: 500;
      font-size: 20px;
      line-height: 23px;
      letter-spacing: 0.15px;
    }
    
    &__table {
      display: flex;
      flex-direction: column; 
    }
    
    &__header {
      display: flex;
      flex-direction: row;
      height: 37px;
      justify-content: space-between;
      align-items: center;
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
      min-width: 240px;
      padding-left: 12px;
      &:nth-child(3) {
        flex: 1;
        overflow: auto;
      }
    }
  }
`;

export default WithDirection(PreviewCsvWrapper);
