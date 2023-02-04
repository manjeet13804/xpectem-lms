import styled from 'styled-components';
import WithDirection from 'settings/withDirection';

const SelectReportTargetWrapper = styled.div`
  .page {
    display: flex;
    flex-direction: column;
    padding: 5px;

    .ant-select-selection {
      height: 40px;
      &__rendered {
        line-height: 38px;
      }
    }
    &__select-title {
      margin-top: 20px;
    }
    &__find {
      display: flex;
      flex-direction: column;
      max-width: 568px;
      width: 100%;
      padding-right: 5px;
    };
    &__select-target {
      display: flex;
      flex-wrap: wrap;
    };
    &__search-button {
      width: fit-content;
      margin: 10px 0;
      align-self: end;
    }
    &__result {
      display: flex;
      flex-direction: column;
      max-width: 568px;
      width: 100%;
    };
    &__search-select {
      margin: 10px 0 20px 0;
    }
    &__next {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
`;

export default WithDirection(SelectReportTargetWrapper);
