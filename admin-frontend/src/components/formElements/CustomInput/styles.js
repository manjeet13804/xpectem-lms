import styled from 'styled-components';
import { palette } from 'styled-theme';
import WithDirection from 'settings/withDirection';

const CustomInputStyles = styled.div`
  .prefix {
    color: ${palette('error', 0)};
    margin-right: 5px;
  }

  .labelText {
    text-transform: capitalize;
  }

  .ant-input {
    margin-bottom: 10px;
  }

  .inputError.ant-input {
    border-color: ${palette('error', 0)};
    box-shadow: 0 0 0 2px rgba(246, 71, 68, 0.2);
  }

  .error {
    color: ${palette('error', 0)};
  }

  .label {
    margin-bottom: 20px;

    &:last-child: {
      margin-bottom: 0px;
    }
  }
`;
export default WithDirection(CustomInputStyles);
