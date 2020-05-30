import React from 'react';

import PropTypes from 'prop-types';

import './PlayerForm.scss';

import authData from '../../helpers/data/authData';

class PlayerForm extends React.Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    saveNewPlayer: PropTypes.func.isRequired,
    putPlayer: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
  }

  state = {
    playerTitle: '',
    playerDesc: '',
    playerImg: '',
    isEditing: false,
  }

  componentDidMount() {
    const { player } = this.props;
    if (player.title) {
      this.setState({
        playerTitle: player.title,
        playerImg: player.imageUrl,
        playerDesc: player.description,
        isEditing: true,
      });
    }
  }

pTitleChange = (e) => {
  e.preventDefault();
  this.setState({ playerTitle: e.target.value });
}

pDescChange = (e) => {
  e.preventDefault();
  this.setState({ playerDesc: e.target.value });
}

pImgChange = (e) => {
  e.preventDefault();
  this.setState({ playerImg: e.target.value });
}

savePlayer = (e) => {
  e.preventDefault();
  const { playerImg, playerTitle, playerDesc } = this.state;
  const { teamId, saveNewPlayer } = this.props;
  const newPlayer = {
    teamId,
    title: playerTitle,
    imageUrl: playerImg,
    description: playerDesc,
    uid: authData.getUid(),
  };
  saveNewPlayer(newPlayer);
}

updatePlayer = (e) => {
  e.preventDefault();
  const { playerImg, playerTitle, playerDesc } = this.state;
  const { teamId, putPlayer, player } = this.props;
  const updatedPlayer = {
    teamId,
    title: playerTitle,
    imageUrl: playerImg,
    description: playerDesc,
    uid: authData.getUid(),
  };
  putPlayer(player.id, updatedPlayer);
}

render() {
  const {
    playerTitle,
    playerImg,
    playerDesc,
    isEditing,
  } = this.state;
  return (
      <div className="PlayerForm">
        <form className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="player-title">Name</label>
            <input type="text" className="form-control" id="player-title" placeholder="Name" value={playerTitle} onChange={this.pTitleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="player-img">Player Image</label>
            <input type="text" className="form-control" id="player-img" placeholder="Image Url" value={playerImg} onChange={this.pImgChange} />
          </div>
          <div className="form-group">
            <label htmlFor="player-desc">Description</label>
            <input type="text" className="form-control" id="player-desc" placeholder="Description" value={playerDesc} onChange={this.pDescChange} />
          </div>
          {
            isEditing
              ? <button type="submit" className="btn btn-primary" onClick={this.updatePlayer}>Update Player</button>
              : <button type="submit" className="btn btn-primary" onClick={this.savePlayer}>Save Player</button>
          }
        </form>
      </div>
  );
}
}

export default PlayerForm;
