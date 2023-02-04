import styled from 'styled-components';
import WithDirection from 'settings/withDirection';

const TechSupportWrapper = styled.div`
  .tech-support { 
    &__text {
      font-size: 16px;
      line-height: 28px;
      margin-top: 16px;
      &-indent {
        margin-top: 24px;
      }
      @media only screen and (max-width: 767px) {
        margin-left: 8px;  
      }
    }

    &__bottom{
    }

    &__attach-button-wrapper{
      margin-bottom: 15px;
    }

    &__avatar{
      
    }

    &__topic-select{
      margin-top: 4px;
      max-width: 700px;
    }

    .avatar-with-name{
      display: flex;
      margin: 15px 0;
      &__avatar{
        
      }
      &__img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      &__name{
        font-size: 16px;
        margin: auto 15px;
        font-weight: 700;
      }
    }

    &__message{
      width: 100%;
      max-width: 700px;
      font-family: monospace;
      font-size: 16px;
      line-height: 24px;
      resize: none;
      min-height: 150px;
      border: none;
    }

    .text-area{
      &__title{
        margin-top: 20px;
        display: flex;
      }

      &__text{
        margin: 0;
        padding: 0;
        font-size: 1.15rem;
        color: #666666;
        white-space: nowrap;
        font-size: 13px;
      }

      &__blue-star{
        margin: 0;
        margin-left: 3px;
        color: #33A0CC;
        font-size: 13px;
      }
    }

    &__attach-button{
      border: none;
      height: 100%;
      min-height: 40px;
      min-width: 140px;
      width: auto;
      font-weight: bold;
      background-color: #D4D4D4;
      border-radius: 4px;
      color: #000000;
      border: none !important;
      outline: none;
      font-size: 14px;
    }

    &__icon{
      margin-right: 10px;
    }
  }
`;

export default WithDirection(TechSupportWrapper);
