import styled from 'styled-components';
import navImage from 'image/detailCourseNav.png';
import { COLORS } from 'constants/constants';
import WithDirection from 'settings/withDirection';

const BannerDetailWrapper = styled.div`
  .banner-detail {
    background: url(${navImage});
    width: 100%;
    max-height: 121px;
    min-height: 121px;
    
    display: flex;
    flex-direction: column;
    
    @media only screen and (max-width: 767px) {
      display: none;
    }
    
    &__title {
      color: ${COLORS.white};
      font-weight: normal;
      font-size: 28px;
      line-height: 40px;
      padding-top: 27px;
      margin-left: 54px;
    }
    
    &__block {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: flex-end;
      flex: 1;
      color: ${COLORS.grayAlto};
      max-width: 1100px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
     
      &-item {
        padding-bottom: 9px;
        border-bottom: 4px solid transparent;
        cursor: pointer;
        
        &_active {
          padding-bottom: 9px;
          color: ${COLORS.white};
          border-bottom: 4px solid ${COLORS.white};
        }
      }
    }
  }
`;

export default WithDirection(BannerDetailWrapper);
