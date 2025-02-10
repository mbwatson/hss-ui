import { createContext, useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createRequests } from'./requests';
import { UrlPropType } from './prop-types';

const PER_PAGE = 10;

const DugContext = createContext({ });

export const useDug = () => useContext(DugContext);

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const {
    fetchConcepts,
    fetchKg,
    fetchStudies,
    fetchVariables,
  } = createRequests(config);

  const handleRequest = async (fetchFunction, params = {}) => {
    setLoading(true);
    setError(null);
    let results = [];
    try {
      results = await fetchFunction(params);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
    return results;
  };

  const searchConcepts = async () => {
    const query = extractQuery(inputRef);
    return query ? handleRequest(fetchConcepts, { query, page: 1, pageSize: 20 }) : [];
  };

  const searchKg = async () => {
    const query = extractQuery(inputRef);
    return query ? handleRequest(fetchKg, { query }) : [];
  };

  const searchStudies = async (conceptId) => {
    const query = extractQuery(inputRef);
    return query ? handleRequest(fetchStudies, { query, concept: conceptId }) : [];
  };

  const searchVariables = async (conceptId) => {
    const query = extractQuery(inputRef);
    return query ? handleRequest(fetchVariables, { query, concept: conceptId }) : [];
  };

  return (
    <DugContext
      value={{
        config,
        error,
        inputRef,
        loading,
        searchConcepts,
        searchKg,
        searchStudies,
        searchVariables,
      }}
    >{ children }</DugContext>
  );
};

DugProvider.propTypes = {
  children: PropTypes.node.isRequired,
  baseUrl: UrlPropType,
};

