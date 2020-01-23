import React, { Component } from 'react';
import cloneDeep from 'lodash.clonedeep';
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
    const teams = inputValue.split('\n').map((teamName) => ({ name: teamName }));
    const rounds = createRounds(teams);
    this.setState({ rounds });
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
    const appStyle = {
      minWidth: `${275 * rounds.length}px`,
      marginTop: '100px',
      marginBottom: '100px',
    };
    const textAreaStyle = {
      display: 'block',
      height: '200px',
      width: '250px',
      resize: 'none',
      background: '#3a404e',
      borderRadius: '2px',
      border: 'solid 1px #868fa5',
      margin: '5px',
      padding: '10px',
      color: '#fff',
    };
    return (
      <>
        <form style={{ marginTop: '50px', marginLeft: '50px', color: '#FFF' }} onSubmit={this.handleSubmit}>
          <label>
            {'teams - one per line, ordered by seed, best to worst: '}
            <textarea style={textAreaStyle} value={inputValue} onChange={this.handleChange} />
          </label>
          <input style={{ display: 'block' }} type='submit' value='Submit' />
        </form>
        <div className='App' style={appStyle}>
          {rounds.map(
            (round) => <Round key={round} round={round} updateMatches={this.updateMatches} />,
          )}
        </div>
      </>
    );
  }
}

export default App;
