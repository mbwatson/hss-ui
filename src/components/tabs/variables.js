import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@components/box';
import { Link } from '@components/link';

export const Variables = ({ variables = [] }) => {
  const [activeVariable, setActiveVariable] = useState(null);

  if (!variables.length) {
    return <Box>None.</Box>
  }

  const handleClickVariable = variable => () => {
    setActiveVariable(variable);
  }

  return (
    <Box id="results" style={{ flexDirection: 'row' }}>
      <Box id="variables-list">
        {variables.map(variable => (
          <Box
            key={`var-${variable.id}`}
            className="result-card"
          >
            <Box className="var-details">
              <strong>{variable.name}</strong><br />
              <Link to={variable.e_link}>{variable.id}</Link><br />
              {variable.description}
            </Box>
            <button className="box" onClick={ handleClickVariable(variable) }>»</button>
          </Box>
        ))}
      </Box>
      <Box id="variable-inspect">
        {
          activeVariable ? (
            <Fragment>
              <button className="box" onClick={ handleClickVariable(null) }>✕</button>
              <pre>{JSON.stringify(activeVariable, null, 2)}</pre>
            </Fragment>
          ) : (
            <div style={{ textAlign: 'center', margin: '10vh auto', maxWidth: '500px' }}>
              To the left is a list of all variables found <br />
              across all studies returned from your search query.<br /><br />
              ← Select one to view details about it.
            </div>
          )
        }
      </Box>
    </Box>
  );
};

Variables.propTypes = {
  variables: PropTypes.array.isRequired,
};
