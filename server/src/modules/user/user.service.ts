import { CookieOptions } from 'express';
import { DI } from '../../di/DI';
import { ICTX } from '../../types/interfaces';
import { userSigninService } from './services/signin';
import { userSignoutService } from './services/signout';
import { userSignupService } from './services/signup';
import { User } from './user.entity';
import { UpdateUserInput } from './user.input';

@DI.register()
export class UserService {
  readonly userRepo = DI.db.getRepository(User);
  readonly utils = DI.utils;

  readonly create = userSignupService(this);
  readonly signin = userSigninService(this);
  readonly signout = userSignoutService(this);

  async createToken(user: User) {
    return this.utils.signJWT({ userId: user.id }, 'jwtSecret', {
      expiresIn: 10,
    });
  }

  setTokenInCookie(
    ctx: ICTX,
    token: string,
    options: CookieOptions = {
      signed: true,
      secure: true, // inaccessible to the JavaScript
      httpOnly: true, // only sent to the server with an encrypted request over the HTTPS protocol.
    }
  ) {
    return ctx.res.cookie('token', token, options);
  }

  async findOneById(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new Error('Not found');
    }

    return user;
  }

  async findUsers() {
    return this.userRepo.find();
  }

  async updateUser({ id, ...rest }: UpdateUserInput) {
    const user = await this.findOneById(id);

    if (!user) {
      throw new Error('User not found');
    }

    if (rest.email) {
      user.email = rest.email;
    }

    if (rest.password) {
      user.password = rest.password;
    }

    const updatedUser = await user.save();

    return updatedUser;
  }
}
