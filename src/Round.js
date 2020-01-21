import React from 'react';
import Match from './Match';

const Round = ({ round, updateMatches }) => {
  const style = {
    display: 'inline-block',
    verticalAlign: 'middle',
    width: '240px',
  };
  return (
    <div style={style}>
      {round.map((match) => <Match key={match.id} match={match} updateMatches={updateMatches} />)}
    </div>
  );
};

export default Round;
