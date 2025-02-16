import { useState } from 'react';
import { useDug } from 'dug';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { SemanticSearchForm } from '@components/form';
import { SearchSuggestions } from '@components/suggestions';
import { Box } from '@components/box';
import { Studies, Variables, RelatedConcepts } from '@components/tabs';

//

export const App = () => {
  const { inputRef, searchConcepts, searchStudies } = useDug();
  const [studies, setStudies] = useState({});
  const [cdes, setCdes] = useState({});
  const [variables, setVariables] = useState([]);
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClickSearch = async event => {
    event.preventDefault();
    setLoading(true);

    try {
      const results = await searchStudies();
      if (!results) return;

      const groups = { cde: {}, nonCde: {}, variables: [] };
      Object.entries(results).forEach(([key, resultsList]) => {
        resultsList.forEach(result => groups.variables.push(...result.elements));
        if (key.toLowerCase().includes('cde')) {
          groups.cde[key] = resultsList;
        } else {
          groups.nonCde[key] = resultsList;
        }
      });

      setCdes(groups.cde);
      setStudies(groups.nonCde);
      setVariables(groups.variables);

      const conceptResults = await searchConcepts();
      if (!conceptResults) return;

      setConcepts(conceptResults);
    } catch (error) {
      console.error('Error fetching studies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickSuggestion = query => event => {
    inputRef.current.value = query;
    handleClickSearch(event);
  }

  return (
    <main>
      <h1 style={{ marginBottom: 0 }}>
        Semantic Search
      </h1>

      {/* search form */}
      <Box>
        <SemanticSearchForm submitHandler={handleClickSearch} />
        <SearchSuggestions onClick={handleClickSuggestion} />
      </Box>

      {/* loading state */}
      {loading && <div>Loading...</div>}

      {/* results */}
      {!loading && (
        <TabGroup>
          <TabList id="tabs">
            <Tab className="box">Studies</Tab>
            <Tab className="box">CDEs</Tab>
            <Tab className="box">Related Concepts</Tab>
            <Tab className="box">Variables</Tab>
          </TabList>
          <TabPanels>
            <TabPanel><Studies studies={studies} /></TabPanel>
            <TabPanel><Studies studies={cdes} /></TabPanel>
            <TabPanel><RelatedConcepts concepts={concepts} /></TabPanel>
            <TabPanel><Variables variables={variables} /></TabPanel>
          </TabPanels>
        </TabGroup>
      )}
    </main>
  );
};
