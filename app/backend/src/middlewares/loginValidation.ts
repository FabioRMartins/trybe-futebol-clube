import { Request, Response, NextFunction } from 'express';
import User from '../database/models/usersModel';

export default class LoginValidation {
  validation = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const result = await User.findOne({ where: { email }, raw: true });
    if (!result) {
      return res.status(404).json({ message: 'Incorrect email or password' });
    }
    return next();
  };
}
