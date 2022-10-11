import TeamsModel from '../database/models/teamsModel';
import MatchesModel from '../database/models/matchesModels';
import Matches from '../interface/matchesInterface';

export default class MatchesService {
  public model = MatchesModel;

  public async getAll(): Promise<Matches[]> {
    const result = (await this.model.findAll({
      include: [
        {
          model: TeamsModel,
          association: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: TeamsModel,
          association: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    })) as Matches[];

    return result;
  }
}
