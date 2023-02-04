import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const CreatedAtBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 187px;
  background-color: ${COLORS.greyBGElement};
  .created {
    display: flex;
    flex-direction: column;
    margin-top: 8px;
    margin-left: 8px;
    &__date {
      display: flex;
      flex-direction: row;
      font-size: 14px;
      line-height: 20px;
      &-title {
        flex: 1;
        font-weight: bold;
        color: ${COLORS.grayDove};
      }
      &-date {
        flex: 2;
        font-weight: normal;
      }
    }
    &__name {
      display: flex;
      flex-direction: row;
      font-size: 14px;
      line-height: 20px;
      &-title {
        flex: 1;
        font-weight: bold;
        color: ${COLORS.grayDove};
      }
      &-text {
        display: flex;
        flex-direction: column;
        flex: 2;
        font-weight: normal;
      }
    }
  }
  .changed {
    display: flex;
    flex-direction: column;
    margin-top: 8px;
    margin-left: 8px;
    &__date {
      display: flex;
      flex-direction: row;
      font-size: 14px;
      line-height: 20px;
      &-title {
        flex: 1;
        font-weight: bold;
        color: ${COLORS.grayDove};
      }
      &-date {
        flex: 2;
        font-weight: normal;
      }
    }
    &__name {
      display: flex;
      flex-direction: row;
      font-size: 14px;
      line-height: 20px;
      &-title {
        flex: 1;
        font-weight: bold;
        color: ${COLORS.grayDove};
      }
      &-text {
        display: flex;
        flex-direction: column;
        flex: 2;
        font-weight: normal;
      }
    }
  }
`;

export default WithDirection(CreatedAtBlockWrapper);