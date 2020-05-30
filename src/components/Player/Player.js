import React from 'react';
import PropTypes from 'prop-types';
import playerShape from '../../helpers/propz/playerShape';

import './Player.scss';

class Player extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
    removePlayer: PropTypes.func.isRequired,
  }

  deletePlayerEvent = (e) => {
    e.preventDefault();
    const { player, removePlayer } = this.props;
    removePlayer(player.id);
  }

  render() {
    const { player } = this.props;
    return (
      <div className="Player">
      <div className="card">
        <img className="playerImg card-img-top" src={player.imageUrl} alt="player" />
        <div className="card-body">
          <h5 className="card-title">{player.title}</h5>
          <p>{player.description}</p>
          <button className="btn btn-danger" onClick={this.deletePlayerEvent}><i className="fas fa-dumpster"></i></button>
        </div>
      </div>
    </div>
    );
  }
}

export default Player;
