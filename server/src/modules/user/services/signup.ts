import { SignupInput } from '../user.input';
import { UserService } from '../user.service';

export const userSignupService =
  (userService: UserService) => async (input: SignupInput) => {
    const repo = userService.userRepo;
    const { email, password } = input;

    return await repo.save({ email, password });
  };
