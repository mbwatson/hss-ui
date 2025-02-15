import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@components/box';

export const Accordion = ({ title, children, onOpen = () => {} }) => {
  const [open, setOpen] = useState(false);

  const handleClickToggleOpen = () => {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
    onOpen();
  };

  return (
    <div className="accordion">
      <Box className="accordion__summary" onClick={handleClickToggleOpen}>
        <div className="accordion__open-indicator">{ open ? 'v' : '>' }</div>
        <div>{title}</div>
      </Box>
      <Box className={ `accordion__details ${ open ? ' open' : '' }` }>
        {children}
      </Box>
    </div>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onOpen: PropTypes.func,
};
