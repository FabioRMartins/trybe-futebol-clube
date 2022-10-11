import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.matchesService.getAll();
    res.status(200).json(result);
  };
}
