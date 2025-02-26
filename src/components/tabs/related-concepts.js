import PropTypes from 'prop-types';
import { Debug } from 'debugger';
import { Accordion, Box, Stack } from '@components/layout';
import { CopyButton } from '@components/copy-button';

export const RelatedConcepts = ({ concepts = [] }) => {
  if (!concepts.length) {
    return <Box>None.</Box>
  }

  return (
    <Box id="results">
      {concepts.map(concept => (
        <Accordion key={`concept-${concept._id}`} title={ concept._source.name }>
          <Box noBorder>
            <Stack>
              <span><strong>ID:</strong> {concept._id}</span>
              <CopyButton text={concept._id} />
            </Stack>
            <br />
            <strong>Description:</strong>&nbsp;{concept._source.description}
          </Box>
          <Debug data={ concept } />
        </Accordion>
      ))}
    </Box>
  );
};

RelatedConcepts.propTypes = {
  concepts: PropTypes.array.isRequired,
};
