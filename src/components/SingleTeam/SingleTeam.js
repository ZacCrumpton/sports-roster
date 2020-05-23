import React from 'react';
import PropTypes from 'prop-types';

import './SingleTeam.scss';
import teamData from '../../helpers/data/teamData';
import playerData from '../../helpers/data/playerData';

import Player from '../Player/Player';

class SingleTeam extends React.Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    setSingleTeam: PropTypes.func.isRequired,
  }

  state = {
    team: {},
    players: [],
  }

  componentDidMount() {
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

  render() {
    const { setSingleTeam } = this.props;
    const { team, players } = this.state;

    const makePlayer = players.map((p) => <Player key={p.id} player={p}/>);

    return (
      <div className="SingleTeam">
        <button className="btn btn-danger" onClick={() => { setSingleTeam(''); }}>X</button>
        <h2>Single Team View</h2>
        <h2>{team.name}</h2>
        <img src={team.imageUrl} alt="teams"/>
        <div className="d-flex flex-wrap">
          {makePlayer}
        </div>
      </div>
    );
  }
}

export default SingleTeam;
