import PropTypes from 'prop-types';

export const SearchSuggestions = ({ onClick }) => {

  return (
    <div id="search-suggestions">
      <span>Example queries:</span>
      <button
        className="box"
        onClick={ onClick('Chronic Pain') }
      >Chronic Pain</button>
      <button
        className="box"
        onClick={ onClick('GAD 7') }
      >GAD 7</button>
      <button
        className="box"
        onClick={ onClick('Migraines') }
      >Migraines</button>
    </div>
  )
}

SearchSuggestions.propTypes = {
  onClick: PropTypes.func.isRequired,
};
