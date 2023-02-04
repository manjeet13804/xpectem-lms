import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const CommunicationItemWrapper = styled.div`
  .communication-item {
    display: flex;
    justify-content: space-between;
    max-width: 862px;
    height: 120px;
    border-bottom: 1px solid ${COLORS.grayDashed};
    border-left: 1px solid ${COLORS.grayDashed};
    margin-left: -1px;

    &__circle {
      background: ${COLORS.blue};
      clip-path: circle(50%);
      margin: 0 15px 0 -25px;
      height: 10px;
      width: 10px;
    }
    
    &__header-wrapper {
      display: flex;
    }

    &__wrapper-left {
      margin: 5px 0 0 76px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      max-width: 45%;
      @media only screen and (max-width: 767px) {
        margin-left: 20px;
      }
    }
    
    &__new-wrapper-left {
      margin: 26px 0 0 56px;
      
      @media only screen and (max-width: 767px) {
        margin-left: 20px;
      }
    }
    
    &__wrapper-right {
      display: flex;
      align-items: end;
      justify-content: space-between;
      flex-direction: column;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 45%;
    }

    &__assigned {
      height: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden
    }

    &__last-answer {
      width: 100%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden
    }
    &__avatar-and-date {
      margin-top: 14px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      max-width: 200px;
      height: 50px;
      @media only screen and (max-width: 560px) {
        flex-direction: column-reverse;
        justify-content: space-around;
        height: 100%;
        margin: 0;
      }
    }
    
    &__student-name {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      letter-spacing: 0.25px;
      color: ${COLORS.mercuryBlack};
      mix-blend-mode: normal;
      opacity: 0.87;
      margin-right: 50px;
    }

    &__title {
      outline: none;
      border: none;
      background-color: transparent;
      margin-top: 6px;
      display: flex;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 28px;
      align-items: center;
      letter-spacing: 0.4px;
      color: ${COLORS.black};
      cursor: pointer;
      
      &-text {
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      @media only screen and (max-width: 560px) {
        font-size: 10px;
      }
    }
    
    &__date {
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      text-align: right;
      width: max-content;
      color: ${COLORS.mercuryBlack};
      mix-blend-mode: normal;
      opacity: 0.87;
      margin-right: 5px;
      @media only screen and (max-width: 560px) {
        font-size: 10px;
      }
    }
    
    &__img-wrap {
      height: 40px;
      width: 40px;
      min-width: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    
    &__img {
      display: block;
      height: 100%;
    }
  }
`;

export default WithDirection(CommunicationItemWrapper);
