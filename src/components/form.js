import { use } from 'react';
import PropTypes from 'prop-types';
import { DugContext } from 'dug';

export const SemanticSearchForm = ({ submitHandler }) => {
  const { inputRef } = use(DugContext);

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
      >Search</button>
    </form>
  )
}

SemanticSearchForm.propTypes = {
  submitHandler: PropTypes.func.isRequired,
};
