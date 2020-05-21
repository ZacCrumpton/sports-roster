import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getTeamsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/teams.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allTeamsObject = result.data;
      const teams = [];
      if (allTeamsObject !== null) {
        Object.keys(allTeamsObject).forEach((teamId) => {
          const newTeam = allTeamsObject[teamId];
          newTeam.id = teamId;
          teams.push(newTeam);
        });
      }
      resolve(teams);
    })
    .catch((err) => reject(err));
});

export default { getTeamsByUid };
