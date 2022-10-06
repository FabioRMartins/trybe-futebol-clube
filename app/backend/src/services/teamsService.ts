import TeamsModel from '../database/models/teamsModel';
import Teams from '../interface/teamsInterface';

export default class TeamsService {
  public model = TeamsModel;

  public async getAll(): Promise<Teams[]> {
    const result = await this.model.findAll();
    return result;
  }

  public async getById(id: string): Promise<Teams> {
    const result = await this.model.findOne({ where: { id }, raw: true }) as Teams;
    return result;
  }
}
