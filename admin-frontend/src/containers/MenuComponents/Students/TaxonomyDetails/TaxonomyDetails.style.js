import styled from 'styled-components';
import WithDirection from 'settings/withDirection';

const TaxonomyWrapper = styled.div`
  .taxonomy-block {    
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

    &__save-button {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
    }

    &__delete-button {
      margin-right: 15px;
    }

    .taxonomy-form {
      &__form-table {
        width: 100%;
        max-width: 700px;
        margin-top: 15px;
      }
  
      &__form-row {
        .form-item {
          margin-right: 15px;

          &__label {
            font-weight: bold;
          }

          &__input {
            width: 250px;
          }

          &__check-box {
            width: fit-content;
            height: fit-content;
            margin: auto;
          }

          &__delete-button {
            width: fit-content;
            margin: 5px auto 0;
            cursor: pointer;
          }

        }
      }

      &__add-button {
        margin-top: 15px;
      }
    }
  }
`;

export default WithDirection(TaxonomyWrapper);
