import { use, useState } from 'react';
import PropTypes from 'prop-types';
import { Debug } from 'debugger';
import { DugContext } from 'dug';
import { Accordion, Box, Stack } from '@components/layout';
import { Link } from '@components/link';
import { Tag } from '@components/tag';
import { CopyButton } from '@components/copy-button';
import { getDomain } from '@util';

//

const StudyCard = ({ study }) => {
  const { findStudy } = use(DugContext);
  const [details, setDetails] = useState(null);

  const getDetails = async () => {
    const results = await findStudy(study.c_id);
    if (!results) { return 'Error loading study details'; }
    setDetails(results);
  };

  return (
    <Accordion title={study.c_name} onOpen={ getDetails }>
      {study.c_id ? (
        <Stack box noBorder justify="space-between">
          <Stack>
            <strong>ID:</strong> {study.c_id} <CopyButton text={study.c_id} />
          </Stack>
          <Link to={study.c_link}>{getDomain(study.c_link)}</Link>
        </Stack>
      ) : (
        <Stack box noBorder justify="space-between">
          <span><strong>ID:</strong> Unknown</span>
        </Stack>
      )}
      <Debug data={ details ? { study, details } : 'Loading...' } />
    </Accordion>
  );
}

StudyCard.propTypes = {
  study: PropTypes.object.isRequired,
};

const useFilters = (tags = []) => {
  const [filters, setFilters] = useState(() => tags.reduce((acc, tag) => {
      acc[tag] = true;
      return acc;
    }, { })
  );
  return {
    state: filters,
    active: tags.filter(tag => filters[tag]),
    toggle: tag => setFilters(prev => ({ ...prev, [tag]: !prev[tag] })),
  };
}

export const Studies = ({ studies = {} }) => {
  const filters = useFilters(Object.keys(studies));

  const Tags = () => (
    Object.keys(filters.state).map(tag => (
      <Tag
        key={tag}
        count={studies?.[tag]?.length ?? 1}
        active={filters.state[tag]}
        onClick={() => filters.toggle(tag)}
      >
        {tag}
      </Tag>
    ))
  );

  const FilteredStudies = () => {
    const flattenedStudies = Object.entries(studies)
      .flatMap(([source, studyList]) => filters.state[source] ? studyList.map(study => ({ ...study, source })) : [])
      .sort((s, t) => s.c_name.localeCompare(t.c_name));

    return flattenedStudies.map(study => (
      <StudyCard key={`study-${study.c_id}`} study={ study } />
    ));
  };

  if (!Object.keys(studies).length) {
    return (
      <Box id="results">
        None.
      </Box>
    )
  }

  return (
    <Box id="results">
      <Box id="tags-list">
        <Tags />
      </Box>
      
      <Box id="studies-list">
        <FilteredStudies />
      </Box>
    </Box>
  );
};


Studies.propTypes = {
  studies: PropTypes.array.isRequired,
};
