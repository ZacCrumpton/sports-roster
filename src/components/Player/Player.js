import React from 'react';

import playerShape from '../../helpers/propz/playerShape';

import './Player.scss';

class Player extends React.Component {
  static propTypes = {
    player: playerShape.playerShape,
  }

  render() {
    const { player } = this.props;
    return (
      <div className="Player col-3">
      <div className="card">
        <img className="playerImg card-img-top" src={player.imageUrl} alt="player" />
        <div className="card-body">
          <h5 className="card-title">{player.title}</h5>
          <p>{player.description}</p>
        </div>
      </div>
    </div>
    );
  }
}

export default Player;
