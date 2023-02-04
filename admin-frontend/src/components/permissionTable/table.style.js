import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const TableWrapper = styled.div`
  overflow-x: auto;
  margin: 30px;

  .customcheck {
    display: flex;
    align-items: center;
    justify-content: center;

    &_all{
      justify-content: flex-start;
    }

    &__container {
      display: flex;
      align-ite,: center;
      justify-content: center;

      svg {
        width: 20px;
        height: 20px;
        border-radius: 5px;
        padding: 1px;
        fill: white;
      }

      &_none {
        width: 20px;
        height: 20px;
        border-radius: 5px;
        border: 1px solid grey;
      }

      &_green {
        svg {
          background: ${COLORS.checkGreen};
        }
      }
      &_blue {
        svg {
          background: ${COLORS.checkBlue};
        }
      }
      &_red {
        svg {
          background: ${COLORS.checkRed};
        }
      }
    }

    &__text {
      white-space: nowrap;
      margin-right: 5px;
    }
  }

  .table {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    border: 1px solid ${COLORS.greyBGElement};
    font-size: 1rem;
    margin: 0.5rem;
    line-height: 1.5;
    max-height: 700px;

    .fixed-row {
      &__top {
        position: sticky;
        top: -1px;
        background: white;
        z-index: 2;
      }
      &__second {
        position: sticky;
        top: 27px;
        z-index: 3;
      }
    }

    .title_fixed {
      position: sticky;
      left: 39px;
      z-index: 1;
      overflow-wrap: break-word;
    }

    .all-button_fixed {
      background: white;
      position: sticky;
      left: 39px;
      z-index: 2;

    }

    .row-button_fixed {
      background: white;
      position: sticky;
      left: 0px;
      z-index: 1;
    }

    td {
      padding: 5px 10px;
    }

    &__body {
      width: max-content;
      height: max-content;
    }

    &__title {

      &-combine {
        background: ${COLORS.grayWild};
        position: relative;

        .title-combine {
          display: flex;
          justify-content: space-between;
          width: 200px;
          height: 30px;
          .row-title {
            align-self: flex-end;
          }
          .coll-title {

          }  
        }

        .title-combine-separator {
          position: absolute;
          width: 100%;
          border-top: 1px solid rgba(0, 0, 0, 0.65);
          left: 0px;
          top: 20px;
          transform: skewY(10deg);
          border-right: 2px solid transparent;
        }
      }

      &-coll {
        background: ${COLORS.grayTitle};
        border-left: 1px solid ${COLORS.grayWild};
        font-weight: 600;
        font-size: 16px;
        color: black;
        text-align: center;
      }

      &-row {
        max-width: 200px;
        background: ${COLORS.grayTitle};
        border-bottom: 1px solid ${COLORS.grayWild};
        font-weight: 600;
        font-size: 18px;
        color: black;
      }

    }

    &__row-element {
      border: 1px solid ${COLORS.grayWild};
      text-align: -webkit-center;
      &_gray {
        background: ${COLORS.grayWild};
      }
    }
  }

`;

export default WithDirection(TableWrapper);
