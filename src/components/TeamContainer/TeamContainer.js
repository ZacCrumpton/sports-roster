import React from 'react';
import PropTypes from 'prop-types';

import teamData from '../../helpers/data/teamData';
import authData from '../../helpers/data/authData';
import Team from '../Team/Team';
import TeamForm from '../TeamForm/TeamForm';

import './TeamContainer.scss';
import smash from '../../helpers/data/smash';

class TeamContainer extends React.Component {
  static propTypes = {
    setSingleTeam: PropTypes.func.isRequired,
  }

  state = {
    teams: [],
    formOpen: false,
    editTeam: {},
  }

  getAllTeams = () => {
    teamData.getTeamsByUid(authData.getUid())
      .then((teams) => this.setState({ teams }))
      .catch((err) => console.error('unable to get all teams', err));
  }

  componentDidMount() {
    this.getAllTeams();
  }

  removeTeam = (teamId) => {
    smash.compeleteyRemoveTeam(teamId)
      .then(() => this.getAllTeams())
      .catch((err) => console.error('unable to delete full team roster: ', err));
  }

  saveNewTeam = (newTeam) => {
    teamData.saveTeam(newTeam)
      .then(() => {
        this.getAllTeams();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('unable to save team: ', err));
  }

  putTeam = (teamId, updatedTeam) => {
    teamData.updateTeam(teamId, updatedTeam)
      .then(() => {
        this.getAllTeams();
        this.setState({ formOpen: false, editTeam: {} });
      })
      .catch((err) => console.error('unable to update team:', err));
  }

  editATeam = (team) => {
    this.setState({ formOpen: true, editTeam: team });
  }

  render() {
    const { teams, formOpen, editTeam } = this.state;
    const { setSingleTeam } = this.props;

    const makeTeams = teams.map((team) => <Team key={team.id} team={team} setSingleTeam={setSingleTeam} editATeam={this.editATeam} removeTeam={this.removeTeam}/>);

    return (
      <div className="TeamContainer">
        <button className="btn btn-dark" onClick={() => this.setState({ formOpen: true })}>Create Team</button>

        { formOpen ? <TeamForm saveNewTeam={this.saveNewTeam} team={editTeam} putTeam={this.putTeam}/> : '' }
        <div className="allTeamCards">
          { makeTeams }
        </div>
      </div>
    );
  }
}

export default TeamContainer;
