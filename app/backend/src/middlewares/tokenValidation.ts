import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';

export default class TokenValidation {
  validation = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    verify(authorization, 'jwt_secret');
    next();
    return res.status(401).json({ message: 'Token must be a valid token' });
  };
}
