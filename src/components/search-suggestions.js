import { useState } from 'react';
import PropTypes from 'prop-types';

const suggestions = [
  'addiction treatment',
  'buprenorphine',
  'chronic pain',
  'cognitive behavioral therapy',
  'depression',
  'fibromyalgia',
  'GAD 7',
  'lower back pain',
  'migraine',
  'naloxone',
  'neuropathic pain',
  'osteoarthritis',
  'opioid use disorder',
  'pain management',
  'physical therapy',
];

function randomElements(arr, n) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('Input must be a non-empty array');
  }
  if (n <= 0) return [];
  
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(n, arr.length));
};

export const SearchSuggestions = ({ onClick }) => {
  const [randomSuggestions, setRandomSuggestions] = useState(() => randomElements(suggestions, 3));

  const handleClickRefresh = () => setRandomSuggestions(randomElements(suggestions, 3));

  return (
    <div id="search-suggestions">
      <em>
        <button
          className="box refresh-button"
          onClick={handleClickRefresh}
        >🗘</button>&nbsp;Sample queries:
      </em>
      {
        randomSuggestions.map(s => (
          <button
            key={ `suggestion-${ s }` }
            className="box suggestion-button"
            onClick={ onClick(s) }
          >{s}</button>
        ))
      }
    </div>
  )
}

SearchSuggestions.propTypes = {
  onClick: PropTypes.func.isRequired,
};
