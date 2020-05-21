import React from 'react';
import PropTypes from 'prop-types';

import './SingleTeam.scss';

class SingleTeam extends React.Component {
  static propTypes = {
    teamId: PropTypes.string.isRequired,
    setSingleTeam: PropTypes.func.isRequired,
  }

  render() {
    const { teamId, setSingleTeam } = this.props;

    return (
      <div className="SingleTeam">
        <button className="btn btn-danger" onClick={() => { setSingleTeam(''); }}>X</button>
        <h2>Single Team View</h2>
        <h3>{teamId}</h3>
      </div>
    );
  }
}

export default SingleTeam;
