import React from 'react';

const Team = ({
  isTeam1 = false,
  match,
  updateMatches,
}) => {
  const {
    id,
    round,
    team1,
    team2,
    winner,
  } = match;
  const team = isTeam1 ? match.team1 : match.team2;
  const containerStyle = {
    height: '25px',
    lineHeight: '25px',
    fontSize: '10px',
    userSelect: 'none',
    borderBottom: isTeam1 ? '1px solid #444549' : '',
  };
  const seedStyle = {
    display: 'inline-block',
    textAlign: 'center',
    color: team && team.seed ? '#23252d' : '#787a80',
    backgroundColor: '#787a80',
    height: '25px',
    width: '22px',
  };
  const nameStyle = {
    display: 'inline-block',
    color: team ? '#FFF' : '#58595e',
    marginLeft: '5px',
    height: '25px',
  };
  return (
    <>
      <div
        style={containerStyle}
        onClick={() => {
          if (!winner && team1 !== null && team2 !== null) {
            updateMatches(id, team, round);
          }
        }}
      >
        <div style={seedStyle}>
          { (team && team.seed) || '0'}
        </div>
        <div style={nameStyle}>
          { (team && (team.name || 'team has no name')) || 'placeholder'}
        </div>
      </div>
      <div style={{ color: '#FFF' }}>
        <div>{team && team.rating ? `elo: ${team.rating}` : null}</div>
        <div>{team && team.wins ? `w: ${team.wins}` : null}</div>
        <div>{team && team.losses ? `l: ${team.losses}` : null}</div>
        <div>{team && team.players ? `current players: ${team.players.join(', ')}` : null}</div>
      </div>
    </>
  );
};

export default Team;
