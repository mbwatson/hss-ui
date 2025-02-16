import PropTypes from 'prop-types';

export const Stack = ({ children, ...props }) => {
  const classes = ['stack'];
  
  if ('box' in props && Boolean(props.box))            { classes.push('box'); }
  if ('noBorder' in props && Boolean(props.noBorder))  { classes.push('no-border'); }
  if ('row' in props && Boolean(props.row))            { classes.push('flex-row'); }
  if ('column' in props && Boolean(props.column))      { classes.push('flex-column'); }
  if ('justify' in props)                              { classes.push(`justify-${props.justify}`); }
  if ('className' in props)                            { classes.push(...props.className.split(' ')); }

  return (
    <div className={ classes.join(' ') }>
      { children }
    </div>
  )
}

Stack.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  column: PropTypes.bool,
  row: PropTypes.bool,
  box: PropTypes.bool,
  justify: PropTypes.string,
  noBorder: PropTypes.bool,
};

