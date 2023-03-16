import { ERROR_CODES } from '../../../error/ErrorCodes';
import { GQLError } from '../../../error/GQLError';
import { ICTX } from '../../../types/interfaces';
import { SignupInput } from '../auth.input';
import { AuthService } from '../auth.service';

export const authSignupService =
  (authService: AuthService) => async (input: SignupInput, ctx: ICTX) => {
    const { userRepo, utils } = authService;
    const { email, password } = input;

    const existingUser = await userRepo.findOne({ where: { email } });

    if (existingUser) {
      throw new GQLError({ code: ERROR_CODES.EMAIL_IN_USE });
    }

    const saltedHashPassword = await utils.genSaltedHashPassword(password);

    const user = await userRepo.save({ email, password: saltedHashPassword });

    const token = await authService.createToken(user);

    authService.setTokenInCookie(ctx, token);

    return user;
  };
