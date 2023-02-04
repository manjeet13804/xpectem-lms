import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const CustomDatePickerWrapper = styled.div`
  position: absolute;
  .custom-date {
    max-width: 320px;
    background-color: ${COLORS.greyBGElement};
    border: 1px solid ${COLORS.grayAlto}
  }

  .header {
    background-color: ${COLORS.grayMineShaft};
    display: flex;
    flex-direction: column;
    padding: 20px 26px 15px;
  }

  .text {
    font-size: 14px;
    line-height: 16px;
    color: ${COLORS.white};
    margin-bottom: 6px;
  }

  .year {
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 9px;
    color: ${COLORS.silver};
  }

  .day {
    font-size: 36px;
    line-height: 42px;
    color: ${COLORS.white};
  }

  .button-block {
    display: flex;
    justify-content: flex-end;
    padding: 0 25px 16px 25px;
  }

  .btn {
    cursor: pointer;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.5px;
    color: ${COLORS.grayMineShaft};
    margin-left: 35px;
    border: none;
    text-transform: uppercase;
    outline: none;

  &:last-child {
      margin-left: 0;
    }
  }

  .calendar {
    border: none;
    padding: 0 7px 20px;
    margin-top: 12px;
    background-color: ${COLORS.greyBGElement};
 
    .react-datepicker {
      &__header {
          background-color: ${COLORS.greyBGElement};
          border: none;
        }
  
      &__month-container {
          background-color: ${COLORS.greyBGElement};
        }
  
      &__current-month {
          margin-bottom: 10px;
          font-size: 14px;
          color: ${COLORS.grayMineShaft};
          font-weight: normal;
        }
  
      &__day-name,
      &__day {
          padding: 9px;
          font-size: 12px;
          margin: 0 2px;
        }
  
      &__day {
          color: ${COLORS.grayCod};
          border-radius: 50%;
  
        &--selected {
            background-color: ${COLORS.grayMineShaft};
            font-weight: normal;
            color: ${COLORS.white};
          }
        &--outside-month {
            color: transparent;
            pointer-events: none;
          }
        }
  
      &__day-name {
          color: ${COLORS.grayBoulder};
        }
  
      &__navigation {
          border: none;
          border-bottom: 3px solid ${COLORS.grayBoulder};
          outline: none;
  
        &--next {
            border-right: 3px solid ${COLORS.grayBoulder};
            transform: rotate(-45deg);
            right: 26px;
          }
  
        &--previous {
            border-left: 3px solid ${COLORS.grayBoulder};
            transform: rotate(45deg);
            left: 26px;
          }
        }
      }
  }
`;
export default WithDirection(CustomDatePickerWrapper);