import { GQLError } from '../../../error/GQLError';
import { SignupInput } from '../user.input';
import { UserService } from '../user.service';

export const userSignupService =
  (userService: UserService) => async (input: SignupInput) => {
    const { userRepo, utils } = userService;
    const { email, password } = input;

    const existingUser = await userRepo.findOne({ where: { email } });

    if (existingUser) {
      throw new GQLError({ message: 'Email is already in use' });
    }

    const saltedHashPassword = await utils.genSaltedHashPassword(password);

    return await userRepo.save({ email, password: saltedHashPassword });
  };
