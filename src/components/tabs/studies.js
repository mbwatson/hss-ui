import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@components/box';
import { Link } from '@components/link';
import { Tag } from '@components/tag';

//

const StudyCard = ({ study }) => {
  return (
    <details key={`study-${study.c_id}`} className="study-card">
      <summary className="box">{study.c_name}</summary>
      <Box className="study-details">
        <Link to={study.c_link}>{study.c_id}</Link><br />
        <p>
          <strong>Abstract:</strong>{' '}
          Lorem ipsum excepteur nulla do labore proident pariatur consectetur dolor ex labore.
          Amet dolor ut non id enim consequat elit mollit nisi excepteur nulla duis laborum officia nostrud velit.
          Voluptate qui id veniam do reprehenderit duis eiusmod irure laborum nisi.
        </p>
      </Box>
    </details>
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
