import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { BugIcon } from './bug-icon';
import './debug-toggler.css';

const DebugContext = createContext({ });

export const useDebugger = () => useContext(DebugContext);

const defaultTogglerStyle = { position: 'fixed', top: '2px', right: '2px' };

export const DebugContextProvider = ({ children }) => {
  const [active, setActive] = useState(false);

  const toggleActivity = () => setActive(prev => !prev);

  const DebugToggler = ({ style = defaultTogglerStyle }) => {
    const { active } = useDebugger();

    return (
      <button
        onClick={ active.toggle }
        style={ style }
        className={`debug-toggler ${ active.state ? 'active' : '' }`}
      >
        <BugIcon active={ active.state } />
      </button>
    );
  };

  return (
    <DebugContext value={{
      active: { state: active, toggle: toggleActivity },
      DebugToggler,
    }}>
      { children }
    </DebugContext>
  );
};

DebugContextProvider.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

export const Debug = ({ title, data }) => {
  const { active } = useDebugger();

  if (!active.state) {
    return <span />
  }
  return (
    <details style={{
      fontSize: '75%',
      backgroundColor: '#ddd',
      textAlign: 'left',
      fontFamily: 'monospace',
    }}>
      <summary style={{
        padding: '0.5rem',
      }}>{ title ?? `DEBUG` }</summary>
      <pre style={{
        backgroundColor: '#eee',
        margin: 0,
        maxHeight: '200px',
        whiteSpace: 'pre',
        overflow: 'auto',
        padding: '1rem',
      }}>{ JSON.stringify(data, null, 2) }</pre>
    </details>
  )
}

Debug.propTypes = {
  data: PropTypes.any,
  title: PropTypes.string,
};
