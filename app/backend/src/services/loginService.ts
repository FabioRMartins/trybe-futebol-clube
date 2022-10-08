import * as bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import Users from '../interface/usersInterface';
import Token from '../interface/tokenInterface';
import UsersModel from '../database/models/usersModel';

const JWT_SECRET = 'jwt_secret';

export default class LoginService {
  public model = UsersModel;

  public login = async (email: string, password: string): Promise<Token> => {
    const user = (await this.model.findOne({
      where: { email },
      raw: true,
    })) as Users;
    if (!user) {
      throw new Error('User not found');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('Incorrect password');
    }
    const token = Jwt.sign(
      {
        id: user.id,
      },
      JWT_SECRET,
      { expiresIn: '1d', algorithm: 'HS256' },
    );
    return token as unknown as Token;
  };

  public loginValidation = async (token: string): Promise<string> => {
    const tokenValidation = Jwt.verify(token, 'jwt_secret') as Token;
    const result = (await this.model.findOne({
      where: { id: tokenValidation.id },
    })) as unknown as Users;

    return result.role;
  };
}
