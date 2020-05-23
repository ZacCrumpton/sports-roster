import PropTypes from 'prop-types';

const playerShape = PropTypes.shape({
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  teamId: PropTypes.string.isRequired,
});

export default { playerShape };
