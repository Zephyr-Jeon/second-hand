import { ERROR_CODES } from '../../../error/ErrorCodes';
import { GQLError } from '../../../error/GQLError';
import { ICTX } from '../../../types/interfaces';
import { SignupInput } from '../user.input';
import { UserService } from '../user.service';

export const userSignupService =
  (userService: UserService) => async (input: SignupInput, ctx: ICTX) => {
    const { userRepo, utils } = userService;
    const { email, password } = input;

    const existingUser = await userRepo.findOne({ where: { email } });

    if (existingUser) {
      throw new GQLError({ code: ERROR_CODES.EMAIL_IN_USE });
    }

    const saltedHashPassword = await utils.genSaltedHashPassword(password);

    const user = await userRepo.save({ email, password: saltedHashPassword });

    const token = await userService.createToken(user);

    userService.setTokenInCookie(ctx, token);

    return user;
  };
