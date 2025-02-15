import PropTypes from 'prop-types';

export const Stack = ({ children, className, ...props }) => {
  const classes = ['stack', ...className.split(' ')];

  if ('row' in props && Boolean(props.row)) {
    classes.push('flex-row');
  }

  if ('column' in props && Boolean(props.column)) {
    classes.push('flex-column');
  }

  if ('justify' in props) {
    classes.push(`justify-${props.justify}`);
  }

  return (
    <div
      className={ classes.join(' ') }
      { ...props }
    >
      { children }
    </div>
  )
}

Stack.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  row: PropTypes.bool,
  column: PropTypes.bool,
  justify: PropTypes.string,
};

