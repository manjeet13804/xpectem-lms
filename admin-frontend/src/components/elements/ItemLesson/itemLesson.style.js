import styled from 'styled-components';
import WithDirection from 'settings/withDirection';
import { COLORS } from 'constants/constants';

const ItemLessonWrapper = styled.div`
  .item-lesson {
    width: 100%;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: ${COLORS.grayDove};
    height: 32px;
    padding-left: 30px;

    &__icon {
      backgroundColor: ${COLORS.green},
      border: 1px solid ${COLORS.grayDove},
      height: 8px,
      borderRadius: 50%,
      width: 8px,

      &_notGreen {
        backgroundColor: ${COLORS.white},
      }
    }

    &__arrow {
      color: ${COLORS.black},
      height: 12px,
      width: 12px,
    }

    &:hover {
      background-color: ${COLORS.greyOrg};
      .item-lesson__right {
        opacity: 1;
      }
      
      .item-lesson__circle {
        opacity: 0;
      }
    }
    
    &__left {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    
    &__right {
      display: flex;
      align-items: center;
      padding-right: 10px;
      opacity: 0;
    }
    
    &__text {
      font-weight: normal;
      font-size: 16px;
      margin-left: 15px;
      color: ${COLORS.black};
    }
  }
`;

export default WithDirection(ItemLessonWrapper);
