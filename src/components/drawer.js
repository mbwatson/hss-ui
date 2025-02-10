import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@components/box';

export const Drawer = ({ children, title }) => {
  const [active, setActive] = useState(false);

  return (
    <div className={ `drawer ${ active ? 'active' : 'inactive' }` }>
      <Box
        className="drawer-title"
        onClick={ () => setActive(!active) }
      >{ active ? '👇 ' : '👆 '}{ title ?? 'Drawer' }</Box>
      <div>
        { children }
      </div>
    </div>
  );
};

Drawer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};
