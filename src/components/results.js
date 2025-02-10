import PropTypes from 'prop-types';
import { Box } from '@components/box';

export const Results = ({ results = [], children }) => {
  if (!results.length) {
    return <Box>None</Box>
  }

  return (
    <Box id="concepts-list">
      {results.map(concept => children(concept))}
    </Box>
  );
};

Results.propTypes = {
  results: PropTypes.array.isRequired,
  children: PropTypes.func.isRequired,
};
