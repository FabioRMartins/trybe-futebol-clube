import Teams from './teamsInterface';

export default interface Matches {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress?: number;
  teamHome?: Teams;
  teamAway?: Teams;
}
