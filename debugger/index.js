import PropTypes from 'prop-types';

export const Debug = ({ title, data }) => {
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
