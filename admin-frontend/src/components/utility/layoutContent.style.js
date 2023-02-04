import styled from 'styled-components';
import { COLORS } from 'constants/constants';

const LayoutContentStyle = styled.div`
  width: 100%;
  padding-left: 8px;
  padding-top: 4px;
  background-color: ${COLORS.white};
  border: none;
  height: 100%;
  @media only screen and (max-width: 767px) {
    padding-left: 0;
  }
`;

export default LayoutContentStyle;
