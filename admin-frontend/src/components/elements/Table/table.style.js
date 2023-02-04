import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const TableWrapper = styled.div`
  margin-top: 30px;
  
  .table {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    border: 1px solid ${COLORS.greyBGElement};
    font-size: 1rem;
    margin: 0.5rem;
    line-height: 1.5;
    min-width: 500px;

    &__row {
      width: 100%;
      &_header {
        background-color: ${COLORS.greyBGElement}!important;
      }
      @media (min-width: 400px) {
        &_header {
          font-weight: 700;
          background-color: ${COLORS.greyBGElement};
        }
      }
    }
    &__row:nth-of-type(even) {
      background-color: ${COLORS.white};
    }
    &__row:nth-of-type(odd) {
      background-color: ${COLORS.white};
    }
    @media (min-width: 400px) {
      &__row {
        display: flex;
        flex-flow: row nowrap;
      }
      &__row:nth-of-type(even) {
        background-color: ${COLORS.white};
      }
      &__row:nth-of-type(odd) {
        background-color: ${COLORS.white};
      }
    }
    &__row-item {
      display: flex;
      flex-flow: row nowrap;
      flex-grow: 1;
      flex-basis: 0;
      padding: 0.5em;
      word-break: break-word;
    }
    &__row-item:before {
      content: attr(data-header);
      width: 30%;
      font-weight: 700;
    }
    @media (min-width: 400px) {
      &__row-item {
        border: 1px solid ${COLORS.white};
        padding: 0.5em;
      }
      &__row-item:before {
        content: none;
      }
    }
  }
`;

export default WithDirection(TableWrapper);
