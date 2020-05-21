import PropTypes from 'prop-types';

const teamShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { teamShape };
