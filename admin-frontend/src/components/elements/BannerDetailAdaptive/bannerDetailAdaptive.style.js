import styled from 'styled-components';
import navAdaptiveImage from '../../../image/detailCourseNav.png';
import { COLORS } from 'constants/constants';
import WithDirection from 'settings/withDirection';

const BannerDetailAdaptiveWrapper = styled.div`
  .banner-detail-adaptive {
    display: none;
    
    @media only screen and (max-width: 767px) {
      background: url(${navAdaptiveImage});
      width: 100%;
      max-height: 156px;
      min-height: 156px;
      
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      
      &__title {
        color: ${COLORS.white};
        font-weight: normal;
        font-size: 24px;        
        padding-top: 30px;
        margin-left: 15px;
      }
      
      &__dropdown {
        margin-top: 30px;
        margin-left: 12px;
        
        &-title {
          font-weight: bold;
          font-size: 16px;
          color: ${COLORS.white};
          margin-top: 50px;
        }
      }
    }
  }
`;

export default WithDirection(BannerDetailAdaptiveWrapper);
