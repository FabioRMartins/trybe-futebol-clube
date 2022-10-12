import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.matchesService.getAll();
    res.status(200).json(result);
  };

  public create = async (req: Request, res: Response) => {
    const result = await this.matchesService.createMatches(req.body);
    return res.status(201).json(result);
  };

  public editMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.matchesService.editMatch(id);
    return res.status(200).json(result);
  };
}
