import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';
import LeaderboardService from '../services/leaderboardService';
import Leaderboard from '../interface/leaderboardInterface';
import Matches from '../interface/matchesInterface';

export default class LeaderController {
  constructor(
    private leaderboardService = new LeaderboardService(),
    private teamsService = new TeamsService(),
  ) {}

  public data = () => {
    const result = {
      teamId: 0,
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
    return result;
  };

  public scoreHome = (matches:Matches, board: Leaderboard) => {
    const result = board;
    result.goalsFavor += matches.homeTeamGoals;
    result.goalsOwn += matches.awayTeamGoals;
    result.totalGames += 1;
    result.goalsBalance = result.goalsFavor - result.goalsOwn;
    if (matches.homeTeamGoals === matches.awayTeamGoals) {
      result.totalDraws += 1;
      result.totalPoints += 1;
    }
    if (matches.homeTeamGoals < matches.awayTeamGoals) {
      result.totalLosses += 1;
    }
    if (matches.homeTeamGoals > matches.awayTeamGoals) {
      result.totalVictories += 1;
      result.totalPoints += 3;
    }
    const matchEfficiency = ((result.totalPoints / (result.totalGames * 3)) * 100).toFixed(2);
    result.efficiency = Number(matchEfficiency);
  };

  public getLeaderboard = (board: Leaderboard[]) => {
    const final = board.sort((a, b) =>
      b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance || b.goalsFavor - a.goalsFavor
    || b.totalGames + a.totalGames);

    return final as unknown as Leaderboard[];
  };

  public getAll = async (_req: Request, res: Response) => {
    const matches = await this.leaderboardService.getAll();
    const teams = await this.teamsService.getAll();
    const newTeam = [];
    for (let index = 1; index < teams.length + 1; index += 1) {
      const result = this.data();
      result.name = teams[index - 1].teamName;
      result.teamId = index;
      matches.map((match) => {
        if (match.homeTeam === index) {
          this.scoreHome(match, result);
        }
        return matches;
      });
      newTeam.push(result);
    }
    return res.status(200).json(this.getLeaderboard(newTeam));
  };
}
