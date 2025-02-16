import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const CopyButton = ({
  text,
  className = '',
  ...props
}) => {
  const [copied, setCopied] = useState(false);
  const classes = useMemo(() => [
    'copy-button',
    ...className.split(' '),
    copied ? 'copied' : '',
  ], [copied]);
  const handleClick = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };
  useEffect(() => {
    const alertTimeout = setTimeout(() => setCopied(false), 3000)
    return () => clearTimeout(alertTimeout)
  }, [copied])
  return (
    <button
      className={ classes.join(' ') }
      onClick={ handleClick }
      { ...props }
    />
  )
}

CopyButton.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};
