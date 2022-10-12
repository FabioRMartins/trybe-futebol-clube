import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import MatchesService from '../services/matchesService';

const JWT_SECRET = 'jwt_secret';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.matchesService.getAll();
    res.status(200).json(result);
  };

  public create = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    try {
      verify(authorization as string, JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    const result = await this.matchesService.createMatches(req.body);
    return res.status(201).json(result);
  };

  public editMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.matchesService.editMatch(id);
    return res.status(200).json(result);
  };
}
