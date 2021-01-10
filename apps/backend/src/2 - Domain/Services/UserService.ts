import { inject, injectable } from 'inversify';
import { Connection } from 'typeorm';
import { User } from '../../3 - Database/Models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface IUserService {
  CheckLogin(
    password: string,
    username?: string,
    email?: string
  ): Promise<boolean | string>;
}

@injectable()
export class UserService implements IUserService {
  private readonly _connectionProvider: Connection;

  constructor(@inject('ConnectionProvider') connectionProvider: Connection) {
    this._connectionProvider = connectionProvider;
  }

  async CheckLogin(
    password: string,
    username?: string,
    email?: string
  ): Promise<boolean | string> {
    const userRepo = this._connectionProvider.getRepository(User);
    let user;
    if (username) {
      user = await userRepo.findOne({ where: { username } });
    } else if (email) {
      user = await userRepo.findOne({ where: { email } });
    }

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        if (!user.active) {
          return false;
        }

        return jwt.sign(
          {
            id: user.id,
          },
          process.env.JWT_KEY,
          { expiresIn: '24h' }
        );
      }
    }
  }
}
