import PropTypes from 'prop-types';

const propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({})),
  match: PropTypes.shape({}),
  actions: PropTypes.shape({}),
  isLoading: PropTypes.bool,
};

export default propTypes;
