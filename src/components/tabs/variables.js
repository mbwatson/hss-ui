import { Fragment, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useWindowWidth } from '@hooks';
import { Box } from '@components/box';
import { Link } from '@components/link';
import { Accordion } from '@components/accordion';

const sortings = {
  ALPHABETICAL: 'ALPHABETICAL',
  GROUP_BY_STUDY: 'GROUP_BY_STUDY',
  SORT_BY_SCORE: 'SORT_BY_SCORE',
  SORT_BY_SOURCE: 'SORT_BY_SOURCE',
}

const sortKey = sorting => ({
  ALPHABETICAL: 'name',
  GROUP_BY_STUDY: 'name', // todo
  SORT_BY_SCORE: 'score',
  SORT_BY_SOURCE: 'name', // todo
})[sorting];

const Instructions = () => (
  <div style={{ textAlign: 'center', margin: '10vh auto', maxWidth: '500px' }}>
    To the left is a list of all variables found <br />
    across all studies returned from your search query.<br /><br />
    ← Select one to view details about it.
  </div>
);

const VariablesDesktop = ({ variables = [] }) => {
  const [activeVariable, setActiveVariable] = useState(null);
  const [sorting, setSorting] = useState('ALPHABETICAL');
  // orders: 0=none, 1=descending, 2=ascending
  const [order, setOrder] = useState(0);
  
  if (!variables.length) {
    return <Box>None.</Box>
  }

  const handleClickSortButton = sortType => () => {
    const newSorting = sortings[sortType];
    // rotate through order options, unless a new sort type is selected
    setOrder(sorting === newSorting ? (order + 1) % 3 : 1);
    setSorting(newSorting);
  }

  const handleClickVariable = variable => () => setActiveVariable(variable);

  const sortedVariables = useMemo(() => {
    if (order === 1) { // ascending
      return variables.sort((v, w) => v[sortKey(sorting)] > w[sortKey(sorting)] ? -1 : 1);
    }
    if (order === 2) { // descending
      return variables.sort((v, w) => v[sortKey(sorting)] < w[sortKey(sorting)] ? -1 : 1);
    }
    return variables;
  }, [order, sorting, variables]);

  const VariableFilters = useCallback(() => {
    return (
      <div id="variable-filters">
        <span>Sort by:</span>
        <button className="box" onClick={handleClickSortButton('GROUP_BY_STUDY')}>
          Study &nbsp;&nbsp;
          {(sorting !== sortings.GROUP_BY_STUDY || order === 0) ? ' ' : order === 1 ? 'v' : '^'}
        </button>
        <button className="box" onClick={handleClickSortButton('SORT_BY_SCORE')}>
          Score &nbsp;&nbsp;
          {(sorting !== sortings.SORT_BY_SCORE || order === 0) ? ' ' : order === 1 ? 'v' : '^'}
        </button>
        <button className="box" onClick={handleClickSortButton('SORT_BY_SOURCE')}>
          Source &nbsp;&nbsp;
          {(sorting !== sortings.SORT_BY_SOURCE || order === 0) ? ' ' : order === 1 ? 'v' : '^'}
        </button>
      </div>
    )
  }, [order, sorting]);

  const VariablesList = useCallback(() => sortedVariables.map(variable => (
    <Box
      key={`var-${variable.id}`}
      className="result-card"
    >
      <Box className="var-details">
        <strong>{variable.name}</strong><br />
        <Link to={variable.e_link}>{variable.id}</Link><br />
        <em>Score: <span>{variable.score}</span></em>
      </Box>
      <button className="box" onClick={ handleClickVariable(variable) }>»</button>
    </Box>
  )), [order, sorting]);

  const ActiveVariableDetails = useCallback(() => (
    <Fragment>
      <button className="box" onClick={ handleClickVariable(null) }>✕</button>
      <Fragment>
        <h2>{ activeVariable.name }</h2>
        <strong>Description:</strong>
        <p>{ activeVariable.description }</p>
        <pre className="box">{JSON.stringify(activeVariable, null, 2)}</pre>
      </Fragment>
    </Fragment>
  ), [activeVariable]);

  return (
    <Box id="results" style={{ flexDirection: 'row' }}>
      <Box id="variables-list">
        <VariableFilters />
        <VariablesList />
      </Box>
      <Box id="variable-inspect">
        { activeVariable
          ? <ActiveVariableDetails />
          : <Instructions /> }
      </Box>
    </Box>
  );
};

const VariableCard = ({ variable }) => {
  return (
    <Accordion title={variable.name}>
      <Box noBorder>
        <Link to={variable.e_link}>{variable.id}</Link><br />
        <em>Score: <span>{variable.score}</span></em>
      </Box>
      <pre className="box">{JSON.stringify(variable, null, 2)}</pre>
    </Accordion>
  );
}

VariableCard.propTypes = {
  variable: PropTypes.object.isRequired,
};

const VariablesMobile = ({ variables = [] }) => {
  const VariablesList = useCallback(() => variables.map(variable => (
    <VariableCard
      key={`var-${variable.id}`}
      variable={ variable }
    />
  )), []);
  return (
    <Box id="results">
      <VariablesList />
    </Box>
  );
};

export const Variables = ({ variables = [] }) => {
  const width = useWindowWidth();
  return width < 900
    ? <VariablesMobile variables={ variables } />
    : <VariablesDesktop variables={ variables } />
};

Variables.propTypes = {
  variables: PropTypes.array.isRequired,
};
VariablesDesktop.propTypes = Variables.propTypes;
VariablesMobile.propTypes = Variables.propTypes;
