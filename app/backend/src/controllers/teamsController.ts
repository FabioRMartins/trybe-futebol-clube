import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  constructor(private teamsService = new TeamsService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.teamsService.getAll();
    res.status(200).json(result);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.teamsService.getById(id);
    res.status(200).json(result);
  };
}
