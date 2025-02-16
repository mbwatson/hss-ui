import PropTypes from 'prop-types';
import { useDug } from 'dug';

export const SemanticSearchForm = ({ submitHandler }) => {
  const {
    inputRef,
    loading,
  } = useDug();

  return (
    <form id="search-form">
      <input
        ref={inputRef}
        placeholder="Enter query"
        autoFocus
      />
      <button
        className="box"
        onClick={submitHandler}
        disabled={loading} // Button is disabled when loading
      >Search</button>
    </form>
  )
}

SemanticSearchForm.propTypes = {
  submitHandler: PropTypes.func.isRequired,
};
