### Overview

https://challongeclone.herokuapp.com

I use challonge.com frequently to set up quick tournaments with friends. This is a clone of that.
Turns out creating brackets are a bit more involved than I first expected.

utils:

createMatches - builds an object of all the matches in every round. Each key is the id of the
match and the values are match objects with { id, round, team1, team2, winner }. This is built
by starting with the teams in order of seed, removing and matching up the first and last elements
of the Array, and repeating this process. In cases of the number of teams not being a power of 2,
we add byes to the array until the closet power of two is reached.

createRounds - builds an array of an array of match objects. Each array represents one round with
index 0 representing round 1. Starting from the last round (which is the last match), we can build
the previous rounds by looking at the team1 and team2 properties.

moveOnByes - checks the matches for byes and moves the correct team to the next round. Mutates the
rounds array.

## Available Scripts

In the project directory, you can run:

### `webpack -p`
### `node server.js`

Open (http://localhost:8080) to view it in the browser.
