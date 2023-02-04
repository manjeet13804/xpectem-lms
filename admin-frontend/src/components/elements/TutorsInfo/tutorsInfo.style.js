import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const TutorsInfoWrapper = styled.div`
  .tutors-info {
    max-width: 550px;
    min-height: 140px;
    max-height: 293px;
    background: ${COLORS.grayMercury};
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    @media only screen and (max-width: 767px) {
      margin-top: 20px;
    }
    &__block {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        @media only screen and (max-width: 560px) {
          font-size: 10px;
        }
    }
    &__title {
        font-style: normal;
        font-weight: bold;
        min-width: 100px;
        color: ${COLORS.mercuryBlack};
        @media only screen and (max-width: 560px) {
          min-width: 100px;
        }
    }
    &__description {
        width: 379px;
        max-height: 60px;
    }
    &__wrap {
      margin-top: 5px;
    }
  }
`;

export default WithDirection(TutorsInfoWrapper);
