import { ERROR_CODES } from '../../../error/ErrorCodes';
import { GQLError } from '../../../error/GQLError';
import { ICTX } from '../../../interface/serverInterfaces';
import { SignupInput } from '../user.input';
import { UserService } from '../user.service';

export const userSignupService =
  (userService: UserService) => async (input: SignupInput, ctx: ICTX) => {
    const { userRepo, utils } = userService;
    const { email, password } = input;

    console.log(13, ctx.req.signedCookies);

    const existingUser = await userRepo.findOne({ where: { email } });

    if (existingUser) {
      throw new GQLError({ code: ERROR_CODES.EMAIL_IN_USE });
    }

    const saltedHashPassword = await utils.genSaltedHashPassword(password);

    const user = await userRepo.save({ email, password: saltedHashPassword });

    ctx.res.cookie('token', 'testToken', {
      signed: true,
      secure: true, // inaccessible to the JavaScript
      httpOnly: true, // only sent to the server with an encrypted request over the HTTPS protocol.
    });

    return user;
  };
