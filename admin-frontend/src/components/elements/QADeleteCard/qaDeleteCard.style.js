import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const CourseCard = styled.div`
  .modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__title {
      font-weight: 500;
      font-size: 24px;
      color: ${COLORS.black};
    }

    &__button {
      width: 140px;
      height: 40px;
      border-radius: 4px;
      background-color: ${COLORS.grayAlto};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: ${COLORS.black};
      outline: none;
      margin-top: 32px;
      border: none;
      
      &_red {
        background-color: ${COLORS.redPomegranate};
        margin-right: 5px;
        color: ${COLORS.white};
      }
    }
  }
`;

export default WithDirection(CourseCard);
