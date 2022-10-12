import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export default interface Token extends Request {
  id?: number;
  token: string;
  email?: string | JwtPayload;
}
