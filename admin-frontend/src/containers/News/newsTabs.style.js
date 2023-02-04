import styled from 'styled-components';
import WithDirection from 'settings/withDirection';

const NewsTabs = styled.div`
  & {
    padding: 40px 20px;
  }

  .isoLayoutContentWrapper {
    padding: 0;
  }

  .newsWrap {
    border: 0;
    padding: 0;
  }
`;

export default WithDirection(NewsTabs);
