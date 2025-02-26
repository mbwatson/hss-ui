import { createContext, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createRequests } from'./requests';
import { UrlPropType } from './prop-types';

const PER_PAGE = 10;

export const DugContext = createContext({ });

const extractQuery = inputRef => {
  if (!inputRef.current) {
    return null;
  }
  const query = inputRef.current.value.trim();
  if (!query) {
    return null;
  }
  return query;
}

export const DugProvider = ({
  children,
  baseUrl,
}) => {
  const [config] = useState({ baseUrl, perPage: PER_PAGE });
  const inputRef = useRef(null);

  const {
    fetchConcepts,
    fetchKg,
    fetchStudies,
    fetchStudy,
    fetchVariables,
  } = createRequests(config);


  const createFetcher = async (fetchFunction, params = {}) => {
    let results = [];
    try {
      results = await fetchFunction(params);
    } catch (error) {
      console.error(error.message);
    }
    return results;
  };

  const searchConcepts = async () => {
    const query = extractQuery(inputRef);
    return query ? createFetcher(fetchConcepts, { query, page: 1, pageSize: 100 }) : [];
  };

  const searchKg = async () => {
    const query = extractQuery(inputRef);
    return query ? createFetcher(fetchKg, { query }) : [];
  };

  const searchStudies = async (conceptId) => {
    const query = extractQuery(inputRef);
    return query ? createFetcher(fetchStudies, { query, concept: conceptId }) : [];
  };

  const findStudy = async (study_id) => {
    const query = extractQuery(inputRef);
    return query ? createFetcher(fetchStudy, { study_id }) : [];
  };

  const searchVariables = async (conceptId) => {
    const query = extractQuery(inputRef);
    return query ? createFetcher(fetchVariables, { query, concept: conceptId }) : [];
  };

  const provided = useMemo(() => ({
    config,
    inputRef,
    searchConcepts,
    searchKg,
    searchStudies,
    findStudy,
    searchVariables,
  }), []);

  return (
    <DugContext value={provided}>
      { children }
    </DugContext>
  );
};

DugProvider.propTypes = {
  children: PropTypes.node.isRequired,
  baseUrl: UrlPropType,
};

