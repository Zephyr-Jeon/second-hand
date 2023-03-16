import { CookieOptions } from 'express';
import { DI } from '../../di/DI';
import { ICTX } from '../../types/interfaces';
import { User } from '../user/user.entity';
import { authSigninService } from './services/signin';
import { authSignoutService } from './services/signout';
import { authSignupService } from './services/signup';

@DI.register()
export class AuthService {
  readonly userRepo = DI.db.getRepository(User);
  readonly utils = DI.utils;

  readonly signup = authSignupService(this);
  readonly signin = authSigninService(this);
  readonly signout = authSignoutService(this);

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
}
