import MatchesModel from '../database/models/matchesModels';

export default class Leaderboard {
  public model = MatchesModel;

  public async getAll(): Promise<MatchesModel[]> {
    const result = await this.model.findAll({ where: { inProgress: false } });
    return result as unknown as MatchesModel[];
  }
}
