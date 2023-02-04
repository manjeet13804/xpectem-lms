import PropTypes from 'prop-types';

const defaultProps = {
  input: PropTypes.shape({}),
  rules: PropTypes.shape({}),
  updateSwitch: PropTypes.func,
  isNewAsset: PropTypes.bool,
  name: PropTypes.string,
  title: PropTypes.string,
};

export default defaultProps;
