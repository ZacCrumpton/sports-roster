import React from 'react';
import PropTypes from 'prop-types';
import './TeamForm.scss';
import authData from '../../helpers/data/authData';

class TeamForm extends React.Component {
  static propTypes = {
    saveNewTeam: PropTypes.func.isRequired,
    putTeam: PropTypes.func.isRequired,
    team: PropTypes.object.isRequired,
  }

  state = {
    teamName: '',
    teamDesc: '',
    teamImg: '',
    isEditing: false,
  }

  componentDidMount() {
    const { team } = this.props;
    if (team.name) {
      this.setState({
        teamName: team.name,
        teamDesc: team.description,
        teamImg: team.imageUrl,
        isEditing: true,
      });
    }
  }

  saveTeam = (e) => {
    e.preventDefault();
    const { teamDesc, teamName, teamImg } = this.state;
    const { saveNewTeam } = this.props;
    const newTeam = {
      name: teamName,
      description: teamDesc,
      imageUrl: teamImg,
      uid: authData.getUid(),
    };
    saveNewTeam(newTeam);
  }

nameChange = (e) => {
  e.preventDefault();
  this.setState({ teamName: e.target.value });
}

descChange = (e) => {
  e.preventDefault();
  this.setState({ teamDesc: e.target.value });
}

imgChange = (e) => {
  e.preventDefault();
  this.setState({ teamImg: e.target.value });
}

updateTeam = (e) => {
  e.preventDefault();
  const { team, putTeam } = this.props;
  const { teamDesc, teamName, teamImg } = this.state;
  const updateTeam = {
    name: teamName,
    description: teamDesc,
    imageUrl: teamImg,
    uid: authData.getUid(),
  };
  putTeam(team.id, updateTeam);
}


render() {
  const {
    teamName,
    teamDesc,
    teamImg,
    isEditing,
  } = this.state;

  return (
      <div className="TeamForm">
        <form className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="team-name">Name</label>
            <input type="text" className="form-control" id="team-name" placeholder="Name" value={teamName} onChange={this.nameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="team-desc">Description</label>
            <input type="text" className="form-control" id="team-desc" placeholder="Description" value={teamDesc} onChange={this.descChange} />
          </div>
          <div className="form-group">
            <label htmlFor="team-img">Team Logo</label>
            <input type="text" className="form-control" id="team-img" placeholder="Team Logo" value={teamImg} onChange={this.imgChange} />
          </div>
          { isEditing
            ? <button type="submit" className="btn btn-primary" onClick={this.updateTeam}>Update Team</button>
            : <button type="submit" className="btn btn-primary" onClick={this.saveTeam}>Save Team</button>
          }
        </form>
      </div>
  );
}
}

export default TeamForm;
