import PropTypes from 'prop-types';

export const Box = ({ children, className, noBorder = false, ...props }) => {
  return (
    <div
      className={ `box ${ className ?? '' } ${ noBorder ? 'no-border' : '' }` }
      { ...props }
    >
      { children }
    </div>
  )
}

Box.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  noBorder: PropTypes.bool,
};

