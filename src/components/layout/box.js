import PropTypes from 'prop-types';

export const Box = ({
  children,
  className = '',
  noBorder = false,
  ...props
}) => {
  const classes = ['box', ...className.split(' ')];
  Boolean(noBorder) && classes.push('no-border');
  return (
    <div className={ classes.join(' ') } { ...props }>
      { children }
    </div>
  )
}

Box.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  noBorder: PropTypes.bool,
};
