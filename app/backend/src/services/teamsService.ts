import TeamsModel from '../database/models/teamsModel';
import Teams from '../interface/teamsInterface';

export default class TeamsService {
  public model = TeamsModel;

  public async getAll(): Promise<Teams[]> {
    const result = await this.model.findAll();
    return result;
  }
}
