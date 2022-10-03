import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res:Response): Promise<Response> => {
    const { email, password } = req.body;
    const result = await this.loginService.login(email, password);
    return res.status(200).json({ token: result });
  };
}
