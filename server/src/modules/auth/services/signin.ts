import { ERROR_CODES } from '../../../error/ErrorCodes';
import { GQLError } from '../../../error/GQLError';
import { ICTX } from '../../../types/interfaces';
import { SigninInput } from '../auth.input';
import { AuthService } from '../auth.service';

export const authSigninService =
  (authService: AuthService) => async (input: SigninInput, ctx: ICTX) => {
    const { userRepo, utils } = authService;
    const { email, password } = input;

    const user = await userRepo.findOne({ where: { email } });

    if (!user) {
      throw new GQLError({ code: ERROR_CODES.NOT_FOUND });
    }

    const authenticated = await utils.comparePassword(user.password, password);

    if (!authenticated) {
      throw new GQLError({ code: ERROR_CODES.NOT_FOUND });
    }

    const token = await authService.createToken({ userId: user.id });

    authService.setTokenInCookie(ctx, token);

    return user;
  };
