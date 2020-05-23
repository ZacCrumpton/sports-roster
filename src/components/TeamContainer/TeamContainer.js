import React from 'react';
import PropTypes from 'prop-types';

import teamData from '../../helpers/data/teamData';
import authData from '../../helpers/data/authData';
import Team from '../Team/Team';

import './TeamContainer.scss';
import smash from '../../helpers/data/smash';

class TeamContainer extends React.Component {
  static propTypes = {
    setSingleTeam: PropTypes.func.isRequired,
  }

  state = {
    teams: [],
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

  render() {
    const { teams } = this.state;
    const { setSingleTeam } = this.props;
    const makeTeams = teams.map((team) => <Team key={team.id} team={team} setSingleTeam={setSingleTeam} removeTeam={this.removeTeam}/>);

    return (
      <div className="TeamContainer">
        <h1>TEAMS</h1>
        <div className="d-flex flex-wrap">
          { makeTeams }
        </div>
      </div>
    );
  }
}

export default TeamContainer;
