import styled from 'styled-components';
import WithDirection from 'settings/withDirection';

const MiniFooterWrapper = styled.div`
  .mini-footer {
    height: 50px;
    display: flex;
    justify-content: center;
  }
  .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 0;
  }

  .part {
    &:first-child {
      margin-left: 0;
      list-style: none;
    }
    margin-left: 25px;
  }

  @media only screen and (max-width: 767px) {
    .mini-footer {
      font-size: 8px;
      line-height: 20px;
    }
    .content {
      flex-direction: row;
      list-style: none;
    }

    .part {
      margin-left: 0;
    }
  }
`;

export default WithDirection(MiniFooterWrapper);