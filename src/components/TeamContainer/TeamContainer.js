import React from 'react';

import teamData from '../../helpers/data/teamData';
import authData from '../../helpers/data/authData';
import Team from '../Team/Team';

import './TeamContainer.scss';

class TeamContainer extends React.Component {
  state = {
    teams: [],
  }

  componentDidMount() {
    teamData.getTeamsByUid(authData.getUid())
      .then((teams) => this.setState({ teams }))
      .catch((err) => console.error('unable to get all teams', err));
  }

  render() {
    const { teams } = this.state;
    const makeTeams = teams.map((team) => <Team key={team.id} team={team}/>);

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
