import PropTypes from 'prop-types';
import { Box } from '@components/box';
import { Link } from '@components/link';

export const RelatedConcepts = ({ concepts = [] }) => {
  if (!concepts.length) {
    return <Box>None.</Box>
  }

  return (
    <Box id="concepts-list">
      {concepts.map(concept => (
        <Box
          key={`concept-${concept.id}`}
          className="result-card"
        >
          <strong>{concept.name}</strong><br />
          <Link to={concept.e_link}>{concept.id}</Link><br />
          {concept.description}
        </Box>
      ))}
    </Box>
  );
};

RelatedConcepts.propTypes = {
  concepts: PropTypes.array.isRequired,
};
