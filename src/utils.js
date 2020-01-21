
const createMatches = (teams) => {
  const totalRounds = Math.ceil(Math.log2(teams.length));
  const numOfByes = 2 ** totalRounds - teams.length;
  const byes = Array(numOfByes).fill({ name: 'bye' });
  const teamsWithByes = teams.concat(byes);
  const teamsWithSeeds = teamsWithByes.map((team, i) => ({ ...team, seed: team.name === 'bye' ? '' : i + 1 }));
  const matches = {};

  let matchesArray = teamsWithSeeds;
  for (let i = 0; i < totalRounds; i += 1) {
    const newMatchesArray = [];
    for (let j = 0; j < matchesArray.length / 2; j += 1) {
      let match;
      if (i === 0) {
        match = {
          id: Object.keys(matches).length,
          round: 0,
          team1: matchesArray[j],
          team2: matchesArray[matchesArray.length - 1 - j],
          winner: null,
        };
        if (match.team1.name === 'bye') {
          match.winner = match.team2.name;
        }
        if (match.team2.name === 'bye') {
          match.winner = match.team1.name;
        }
      } else {
        match = {
          id: Object.keys(matches).length,
          round: i,
          team1: null,
          team2: null,
          prevMatch1: matchesArray[j].id,
          prevMatch2: matchesArray[matchesArray.length - 1 - j].id,
          winner: null,
        };
      }
      matches[match.id] = match;
      newMatchesArray.push(match);
    }
    matchesArray = newMatchesArray;
  }
  return matches;
};

// mutates rounds
const moveOnByes = (rounds, matches) => {
  const secondRound = rounds[1];
  for (let i = 0; i < secondRound.length; i += 1) {
    const { prevMatch1, prevMatch2 } = secondRound[i];
    if (matches[prevMatch1].team1.name === 'bye') {
      secondRound[i].team1 = matches[prevMatch1].team2;
    }
    if (matches[prevMatch1].team2.name === 'bye') {
      secondRound[i].team1 = matches[prevMatch1].team1;
    }
    if (matches[prevMatch2].team1.name === 'bye') {
      secondRound[i].team2 = matches[prevMatch2].team2;
    }
    if (matches[prevMatch2].team2.name === 'bye') {
      secondRound[i].team2 = matches[prevMatch2].team1;
    }
  }
};

const createRounds = (teams) => {
  const matches = createMatches(teams);
  const rounds = [[matches[Object.keys(matches).length - 1]]];
  while (rounds[0][0].round !== 0) {
    const currentRound = rounds[0];
    const nextRound = [];
    for (let i = 0; i < currentRound.length; i += 1) {
      nextRound.push(matches[currentRound[i].prevMatch1], matches[currentRound[i].prevMatch2]);
    }
    rounds.unshift(nextRound);
  }
  if (!Number.isInteger(Math.log2(teams.length))) {
    moveOnByes(rounds, matches);
  }
  return rounds;
};

export default createRounds;
