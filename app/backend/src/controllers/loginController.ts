import { Request, Response } from 'express';
import LoginService from '../services/loginService';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await this.loginService.login(email, password);
    if (!token) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    return res.status(200).json({ token });
  };

  public loginValidation = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    const role = await this.loginService.loginValidation(authorization);
    return res.status(200).json({ role });
  };
}
