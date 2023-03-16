import { CookieOptions } from 'express';
import { DI } from '../../di/DI';
import { ICTX, IJWTPayload } from '../../types/interfaces';
import { User } from '../user/user.entity';
import { authSigninService } from './services/signin';
import { authSignoutService } from './services/signout';
import { authSignupService } from './services/signup';

@DI.register()
export class AuthService {
  readonly userRepo = DI.getUserRepo;
  readonly serverEnums = DI.serverEnums;
  readonly serverConfigs = DI.serverConfigs;
  readonly utils = DI.utils;

  readonly signup = authSignupService(this);
  readonly signin = authSigninService(this);
  readonly signout = authSignoutService(this);

  async createToken(payload: IJWTPayload) {
    return this.utils.signJWT(
      { userId: payload },
      this.serverConfigs.JWT_SECRET,
      { expiresIn: this.serverConfigs.JWT_EXPERATION_TIME }
    );
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
    return ctx.res.cookie(this.serverEnums.COOKIE_NAMES.TOKEN, token, options);
  }

  clearTokenInCookie(ctx: ICTX) {
    return ctx.res.clearCookie(this.serverEnums.COOKIE_NAMES.TOKEN);
  }
}
