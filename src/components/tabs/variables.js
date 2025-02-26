import { Fragment, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Debug } from 'debugger';
import { useWindowWidth } from '@hooks';
import { Accordion, Box, Stack } from '@components/layout';
import { Link } from '@components/link';
import { CopyButton } from '@components/copy-button';
import { getDomain } from '@util';

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

const VariablesForDesktop = ({ variables = [] }) => {
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
    return variables.sort((v, w) => v.name < w.name ? -1 : 1);;
  }, [order, sorting, variables]);

  const VariableFilters = useCallback(() => {
    return (
      <div id="variable-filters">
        <span className="label">Sort by:</span>
        <button className="box" onClick={handleClickSortButton('GROUP_BY_STUDY')} disabled>
          Study &nbsp;&nbsp;
          {(sorting !== sortings.GROUP_BY_STUDY || order === 0) ? ' ' : order === 1 ? 'v' : '^'}
        </button>
        <button className="box" onClick={handleClickSortButton('SORT_BY_SCORE')}>
          Score &nbsp;&nbsp;
          {(sorting !== sortings.SORT_BY_SCORE || order === 0) ? ' ' : order === 1 ? 'v' : '^'}
        </button>
        <button className="box" onClick={handleClickSortButton('SORT_BY_SOURCE')} disabled>
          Source &nbsp;&nbsp;
          {(sorting !== sortings.SORT_BY_SOURCE || order === 0) ? ' ' : order === 1 ? 'v' : '^'}
        </button>
      </div>
    )
  }, [order, sorting]);

  const VariablesList = useCallback(() => sortedVariables.map(variable => (
    <Box key={`var-${variable.id}`} className="result-card">
      <Stack column className="var-details">
        <strong>{variable.name}</strong><br />
        <Stack>
          <span><strong>ID:</strong> {variable.id}</span>
          <CopyButton text={variable.id} />
        </Stack>
        <Link to={variable.e_link}>{getDomain(variable.e_link)}</Link><br />
        <em>Score: <span>{variable.score}</span></em>
      </Stack>
      <button className="box" onClick={ handleClickVariable(variable) }>»</button>
    </Box>
  )), [order, sorting]);

  const ActiveVariableDetails = useCallback(() => (
    <Fragment>
      <button
        className="box close-button"
        onClick={ handleClickVariable(null) }
      >✕</button>
      
      <h2 style={{ marginTop: 0 }}>{ activeVariable.name }</h2>
      
      <Stack justify="space-between">
        <Stack>
          <strong>ID:</strong> { activeVariable.id }
          <CopyButton text={activeVariable.id} />
        </Stack>
        <div>
          <Link to={activeVariable.e_link}>{getDomain(activeVariable.e_link)}</Link><br />
        </div>
      </Stack>
      
      <br />
      <strong>Description:</strong> { activeVariable.description }
      
      <br /><br />
      <Debug data={ activeVariable } />
    </Fragment>
  ), [activeVariable]);

  return (
    <Stack row box id="results">
      <Box id="variables-list">
        <VariableFilters />
        <VariablesList />
      </Box>
      <Box id="variable-inspect">
        { activeVariable
          ? <ActiveVariableDetails />
          : <Instructions /> }
      </Box>
    </Stack>
  );
};

const VariableAccordionCard = ({ variable }) => {
  return (
    <Accordion title={variable.name}>
      <Stack box noBorder justify="space-between">
        <Stack>
          <strong>ID:</strong> {variable.id} <CopyButton text={variable.id} />
        </Stack>
        <Link to={variable.e_link}>{getDomain(variable.e_link)}</Link>
        <em>Score: <span>{variable.score}</span></em>
      </Stack>
      <Debug data={ variable } />
    </Accordion>
  );
}

VariableAccordionCard.propTypes = {
  variable: PropTypes.object.isRequired,
};

const VariablesForMobile = ({ variables = [] }) => {
  const VariablesList = useCallback(() => variables.map(variable => (
    <VariableAccordionCard key={`var-${variable.id}`} variable={ variable } />
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
    ? <VariablesForMobile variables={ variables } />
    : <VariablesForDesktop variables={ variables } />
};

Variables.propTypes = {
  variables: PropTypes.array.isRequired,
};
VariablesForDesktop.propTypes = Variables.propTypes;
VariablesForMobile.propTypes = Variables.propTypes;
