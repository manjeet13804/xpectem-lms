import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const CoursesCreateMMCWrapper = styled.div`
  .page {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-right: 16px;
     @media only screen and (max-width: 1465px) {
       display: flex;
       flex-direction: column;
       margin-left: 16px;
     }
    
    &__article {
      margin-top: 25px;
      color: black;
      font-size: 16px;
    }
    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: center;
      margin-top: 50px;
      margin-right: 20px;
      width: 150px;
      height: 60px;
      border-radius: 4px;
      background-color: ${COLORS.grayAlto};
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      color: ${COLORS.black};
      outline: none;
      text-align: center;
    }
  }
`;

export default WithDirection(CoursesCreateMMCWrapper);
