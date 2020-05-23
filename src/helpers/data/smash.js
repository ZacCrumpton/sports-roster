import teamData from './teamData';
import playerData from './playerData';

const compeleteyRemoveTeam = (teamId) => new Promise((resolve, reject) => {
  teamData.deleteTeam(teamId)
    .then(() => {
      playerData.getPlayersByTeamId(teamId)
        .then((players) => {
          players.forEach((player) => playerData.deletePlayer(player.id));
          resolve();
        });
    })
    .catch((err) => reject(err));
});

export default { compeleteyRemoveTeam };
