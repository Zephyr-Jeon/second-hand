import { ERROR_CODES } from '../../../error/ErrorCodes';
import { GQLError } from '../../../error/GQLError';
import { ICTX } from '../../../interface/serverInterfaces';
import { SigninInput } from '../user.input';
import { UserService } from '../user.service';

export const userSigninService =
  (userService: UserService) => async (input: SigninInput, ctx: ICTX) => {
    const { userRepo, utils } = userService;
    const { email, password } = input;

    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
      throw new GQLError({ code: ERROR_CODES.NOT_FOUND });
    }

    const authenticated = await utils.comparePassword(user.password, password);

    if (!authenticated) {
      throw new GQLError({ code: ERROR_CODES.NOT_FOUND });
    }

    ctx.res.cookie('token', 'testToken', {
      signed: true,
      secure: true, // inaccessible to the JavaScript
      httpOnly: true, // only sent to the server with an encrypted request over the HTTPS protocol.
    });

    return user;
  };
