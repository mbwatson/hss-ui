import PropTypes from 'prop-types';

export const Box = ({ children, className, ...props }) => {
  return (
    <div className={ `box ${ className }` } { ...props }>
      { children }
    </div>
  )
}

Box.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

