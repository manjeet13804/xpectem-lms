import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const CertificationsWrapper = styled.div`
  .page {
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-right: 16px;

    &__calendar {
      border: none;
      padding: 0 7px 20px;
      background-color: ${COLORS.greyBGElement};
      display: flex;

      .react-datepicker__triangle {
        display: none;
      }
  
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
          font-size: 12px;
        }
  
        &__day {
          color: ${COLORS.grayCod};
          border-radius: 50%;
          padding-top: 1px;
  
          &--disabled {
            color: #b7b7bb;
          }
  
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
            right: 108px;
          }
  
          &--previous {
            border-left: 3px solid ${COLORS.grayBoulder};
            transform: rotate(45deg);
            left: 26px;
          }
        }
      }
    }

    &__modal {
      padding: 24px 90px !important;

      .ant-modal-close {
        padding-right: 90px;
      }
    }

    &__date-picker {
      width: 100%;
    }
    
    &__footer {
      display: flex;
      justify-content: center;
      width: 100%;
      max-width: 1148px;
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 100%;
      max-width: 165px;
      border-radius: 4px;
      background-color: ${COLORS.grayAlto};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: ${COLORS.black};
      outline: none;
      margin-top: 25px;
      border: none;
      cursor: pointer;
      letter-spacing: 0.75px;
      opacity: 0.87;
      
      &_disabled {
        background-color: ${COLORS.greyBack};
        border: none;
        color: ${COLORS.grayBoulder};
      }

      &_error  {
        background-color: ${COLORS.redFlamingo};
        margin-right: 10px;
      }
    }

    &__create-folder {
     
      &-content {
        margin-top: 38px;
      }
      
      &-title {
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 28px;
        color: ${COLORS.black};
      }
      
      &-input {
        border: none;
        outline: none;
        padding: 8px;
        width: 100%;
      }

      &-input-title {
        font-weight: normal;
        font-size: 14px;
        line-height: 16px;
        letter-spacing: 0.4px;
        color: ${COLORS.black}
      }
      
      &-footer {
        display:flex;
        justify-content: center;
      }
    }    
  }
`;

export default WithDirection(CertificationsWrapper);
