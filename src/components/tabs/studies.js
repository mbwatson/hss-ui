import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDug } from 'dug';
import { Box } from '@components/box';
import { Accordion } from '@components/accordion';
import { Link } from '@components/link';
import { Tag } from '@components/tag';

//

const StudyCard = ({ study }) => {
  const { findStudy } = useDug();
  const [details, setDetails] = useState(null);

  const getDetails = async () => {
    const results = await findStudy(study.c_id);
    if (!results) { return 'Error loading study details'; }
    setDetails(results);
  };

  return (
    <Accordion title={study.c_name} onOpen={ getDetails }>
      {study.c_id && <Box noBorder><Link to={study.c_link}>{study.c_id}</Link></Box>}
      <pre>{ details ? JSON.stringify(details, null, 2) : 'Loading...' }</pre>
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
