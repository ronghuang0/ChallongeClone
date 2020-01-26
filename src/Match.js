import React from 'react';
import Team from './Team';

const Match = ({ match, updateMatches }) => {
  const {
    round,
  } = match;
  const style = {
    display: 'inline-block',
    overflow: 'hidden',
    height: '50px',
    width: '200px',
    margin: `${5 + 30 * round}px 15px`,
    borderRadius: '3px',
    backgroundColor: '#58595e',
    textAlign: 'left',
  };
  return (
    <div style={style}>
      <Team isTeam1 match={match} updateMatches={updateMatches} />
      <Team match={match} updateMatches={updateMatches} />
    </div>
  );
};

export default Match;
