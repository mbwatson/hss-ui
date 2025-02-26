import PropTypes from 'prop-types';

export const BugIcon = ({ active, ...props }) => {
  return (
    <svg
      className="bug-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={ active ? 'mediumseagreen' : 'slategrey' }
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Head */}
      <circle cx="12" cy="5" r="2" />
      {/* Body */}
      <path d="M12 7c3.5 0 6 2.7 6 6v2a6 6 0 0 1-12 0v-2c0-3.3 2.5-6 6-6z" />
      {/* Wings Split */}
      <line x1="12" y1="7" x2="12" y2="19" />
      {/* Spots */}
      <circle cx="10" cy="10" r="1" />
      <circle cx="14" cy="10" r="1" />
      <circle cx="9" cy="14" r="1" />
      <circle cx="15" cy="14" r="1" />
      {/* Legs */}
      <path d="M5 9h3" />
      <path d="M16 9h3" />
      <path d="M4 14h3" />
      <path d="M17 14h3" />
      <path d="M6 19l2-1" />
      <path d="M16 19l2-1" />
    </svg>
  );
};

BugIcon.propTypes = {
  active: PropTypes.bool,
};

