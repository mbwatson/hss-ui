import PropTypes from 'prop-types';

export const Tag = ({ active, children, count, onClick }) => {
  return (
    <div className={ `tag ${ active ? 'active' : '' }` } onClick={ onClick }>
      { children } { Number.isInteger(count) && count >= 0 ? `(${ count })` : '' }
    </div>
  )
};

Tag.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  count: PropTypes.number,
  onClick: PropTypes.func,
};
