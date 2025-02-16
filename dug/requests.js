export const createRequests = (config) => {
  const baseUrl = config.baseUrl.replace(/\/$/, '');

  const fetchConcepts = ({ query, page, pageSize }) => {
    return fetch(`${baseUrl}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, page, pageSize }),
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to fetch concepts');
      })
      .then((data) => {
        if (data.status === 'success') {
          return data?.result?.hits?.hits ?? [];
        }
        throw new Error('Invalid response structure');
      });
  };

  const fetchKg = async ({ query, uniqueId, size = 100 }) => {
    return fetch(`${baseUrl}/search_kg`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, unique_id: uniqueId, index: 'kg_index', size }),
    }).then(res => res.json());
  };

  const fetchVariables = async ({ query, concept = '', page = 1, pageSize = 1000 }) => {
    if (!query) {
      return Promise.resolve([]); // Skip request if query is empty
    }

    const payload = {
      query,
      index: 'variables_index',
      concept,
      offset: (page - 1) * pageSize,
      size: pageSize,
    };

    try {
      const response = await fetch(`${baseUrl}/search_var`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'success' && data.result) {
        return data.result; // Returning the full result object
      }

      throw new Error('Invalid API response structure');
    } catch (error) {
      console.error('fetchVariables error:', error);
      throw error;
    }
  };

  const fetchStudies = async ({ query, concept = '', page = 1, pageSize = 1000 }) => {
    if (!query) {
      return Promise.resolve([]); // Skip request if query is empty
    }

    const payload = {
      query,
      index: 'variables_index',
      concept,
      offset: (page - 1) * pageSize,
      size: pageSize,
    };

    try {
      const response = await fetch(`${baseUrl}/search_var`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'success' && data.result) {
        return data.result.total_items === 0 ? [] : data.result;
      }

      throw new Error('Invalid API response structure');
    } catch (error) {
      console.error('fetchStudies error:', error);
      throw error;
    }
  };

  const fetchStudy = async ({ study_id }) => {
    const url = `${baseUrl}/search_study?study_id=${study_id}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.status === 'success') {
        return data?.result?.hits?.hits ?? [];
      }

      throw new Error('Invalid API response structure');
    } catch (error) {
      console.error('fetchStudies error:', error);
      throw error;
    }
  };

  return {
    fetchConcepts,
    fetchKg,
    fetchStudies,
    fetchStudy,
    fetchVariables,
  };
};
