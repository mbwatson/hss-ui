import { use, useState } from 'react';
import { DugContext } from 'dug';
import { useDebugger } from 'debugger';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { SemanticSearchForm } from '@components/form';
import { SearchSuggestions } from '@components/suggestions';
import { Box } from '@components/layout';
import { Studies, Variables, RelatedConcepts } from '@components/tabs';

//

export const App = () => {
  const { inputRef, searchConcepts, searchStudies } = use(DugContext);
  const [studies, setStudies] = useState({});
  const [cdes, setCdes] = useState({});
  const [variables, setVariables] = useState([]);
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { DebugToggler } = useDebugger();

  const handleClickSearch = async event => {
    event.preventDefault();
    setLoading(true);

    try {
      const results = await searchStudies();

      // fetch and store studies, CDEs, and variables
      const groups = { cdes: {}, studies: {}, variables: [] };
      Object.entries(results).forEach(([key, resultsList]) => {
        resultsList.forEach(result => groups.variables.push(...result.elements));
        if (key.toLowerCase().includes('cde')) {
          groups.cdes[key] = resultsList;
        } else {
          groups.studies[key] = resultsList;
        }
      });
      setCdes(groups.cdes);
      setStudies(groups.studies);
      setVariables(groups.variables);

      // and now fetch and store related concepts
      const conceptResults = await searchConcepts();
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
        Semantic Search <DebugToggler />
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
