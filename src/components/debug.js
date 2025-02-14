import PropTypes from 'prop-types';

export const Debug = ({ title, data }) => {
  // console.log(`DEBUG`, data);
  
  return (
    <details className="debug">
      <summary className="box">{ title ?? `DEBUG` }</summary>
      <pre className="box">{ JSON.stringify(data, null, 2) }</pre>
    </details>
  )
}

Debug.propTypes = {
  data: PropTypes.any,
  title: PropTypes.string,
};
