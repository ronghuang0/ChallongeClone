/* eslint-disable */

import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
import orderBy from 'lodash.orderby';
import './App.css';
import Round from './Round';
import createRounds from './utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rounds: [],
      inputValue: '',
    };
  }

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleSubmit = (e) => {
    const { inputValue } = this.state;
    e.preventDefault();
    if (inputValue <= 1) {
      alert('Not Valid');
      return;
    }
    const teams = inputValue.split('\n').map((teamName) => {
      return {
        name: teamName
      }
    });
    const rounds = createRounds(teams);
    this.setState({ rounds });
    // const numberOfTeams = inputValue;
    // fetch('https://api.opendota.com/api/teams').then((response) => response.json())
    //   .then((response) => {
    //     const listOfTeams = orderBy(response, 'rating', 'desc');
    //     const teamsInTourney = listOfTeams.slice(0, numberOfTeams);
    //     const promises = teamsInTourney.map((team) => {
    //       const promise = fetch(`https://api.opendota.com/api/teams/${team.team_id}/players`).then((resp) => resp.json());
    //       return promise;
    //     });
    //     Promise.all(promises).then((resp) => {
    //       const updatedTeamsInTourney = [];
    //       resp.forEach((team, i) => {
    //         const currentTeam = team.filter((player) => player.is_current_team_member)
    //           .map((player) => player.name);
    //         teamsInTourney[i].players = currentTeam;
    //         updatedTeamsInTourney[i] = teamsInTourney[i];
    //       });
    //       const rounds = createRounds(updatedTeamsInTourney);
    //       this.setState({ rounds });
    //     });
    //   });
  }

  updateMatches = (id, winner, round) => {
    const { rounds } = this.state;
    const roundToUpdate = rounds[round + 1];
    if (rounds.length - 1 === round) {
      alert(`yay winner: ${winner.name}`);
    } else {
      for (let i = 0; i < roundToUpdate.length; i += 1) {
        if (roundToUpdate[i].prevMatch1 === id) {
          const roundsCopy = cloneDeep(rounds);
          roundsCopy[round + 1][i].team1 = winner;
          this.setState({ rounds: roundsCopy });
          break;
        }
        if (roundToUpdate[i].prevMatch2 === id) {
          const roundsCopy = cloneDeep(rounds);
          roundsCopy[round + 1][i].team2 = winner;
          this.setState({ rounds: roundsCopy });
          break;
        }
      }
    }
  }

  render() {
    const { inputValue, rounds } = this.state;
    const style = {
      minWidth: `${275 * rounds.length}px`,
      marginTop: '100px',
      marginBottom: '100px',
    };
    return (
      <>
        <form style={{ marginTop: '50px', marginLeft: '50px', color: '#FFF' }} onSubmit={this.handleSubmit}>
          <label>
            {'teams - one per line, ordered by seed, best to worst: '}
            <textarea style={{ display: 'block' }} value={inputValue} onChange={this.handleChange} />
          </label>
          <input style={{ display: 'block' }} type='submit' value='Submit' />
        </form>
        <div className='App' style={style}>
          {rounds.map(
            (round) => <Round key={round} round={round} updateMatches={this.updateMatches} />,
          )}
        </div>
      </>
    );
  }
}

export default App;
