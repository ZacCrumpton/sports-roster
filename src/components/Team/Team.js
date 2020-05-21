import React from 'react';
import teamShape from '../../helpers/propz/teamShape';
import './Team.scss';

class Team extends React.Component {
  static propTypes = {
    team: teamShape.teamShape,
  }

  render() {
    const { team } = this.props;

    return (
      <div className="Team col-4">
        <div className="card">
         <img className="card-img-top" src={team.imageUrl} alt="teams"/>
          <div className="card-body">
            <h5 className="card-title">{team.name}</h5>
            <p className="card-text">{team.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Team;
