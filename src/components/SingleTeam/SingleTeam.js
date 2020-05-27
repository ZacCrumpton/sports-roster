import React from 'react';
import PropTypes from 'prop-types';

import './SingleTeam.scss';
import teamData from '../../helpers/data/teamData';
import playerData from '../../helpers/data/playerData';

import Player from '../Player/Player';
import PlayerForm from '../PlayerForm/PlayerForm';

class SingleTeam extends React.Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    setSingleTeam: PropTypes.func.isRequired,
  }

  state = {
    team: {},
    players: [],
    formOpen: false,
  }

  getInfo = () => {
    const { teamId } = this.props;
    teamData.getSingleTeam(teamId)
      .then((request) => {
        const team = request.data;
        this.setState({ team });
        playerData.getPlayersByTeamId(teamId)
          .then((players) => this.setState({ players }));
      })
      .catch((err) => console.error('unable to get single team', err));
  }

  componentDidMount() {
    this.getInfo();
  }

  removePlayer = (playerId) => {
    playerData.deletePlayer(playerId)
      .then(() => this.getInfo())
      .catch((err) => console.error('could not delete player', err));
  }

  saveNewPlayer = (newPlayer) => {
    playerData.savePlayer(newPlayer)
      .then(() => {
        this.getInfo();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('unable to save new player: ', err));
  }

  render() {
    const { setSingleTeam, teamId } = this.props;
    const { team, players, formOpen } = this.state;

    const makePlayer = players.map((p) => <Player key={p.id} player={p} removePlayer={this.removePlayer}/>);

    return (
      <div className="SingleTeam">
        <div className="d-flex flex-wrap align-content-center">
          <button className="btn btn-danger" onClick={() => { setSingleTeam(''); }}>X</button>
          <button className="btn btn-dark" onClick={() => this.setState({ formOpen: true })}>Add Player</button>
        </div>
        <h2>{team.name}</h2>
        <img src={team.imageUrl} alt="teams"/>
        { formOpen ? <PlayerForm teamId={teamId} saveNewPlayer={this.saveNewPlayer} /> : '' }
        <div className="d-flex flex-wrap">
          {makePlayer}
        </div>
      </div>
    );
  }
}

export default SingleTeam;
