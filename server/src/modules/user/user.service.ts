import { DI } from '../../di/DI';
import { ERROR_CODES } from '../../error/ErrorCodes';
import { GQLError } from '../../error/GQLError';
import { UpdateUserInput } from './user.input';

@DI.register()
export class UserService {
  readonly userRepo = DI.getUserRepo;
  readonly utils = DI.utils;

  async findOneById(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new GQLError({ code: ERROR_CODES.NOT_FOUND });
    }

    return user;
  }

  async findUsers() {
    return this.userRepo.find();
  }

  async updateUser({ id, ...rest }: UpdateUserInput) {
    const user = await this.findOneById(id);

    if (!user) {
      throw new GQLError({ code: ERROR_CODES.NOT_FOUND });
    }

    if (rest.email) {
      const isDuplicated = !!(await this.userRepo.findOneBy({
        email: rest.email,
      }));

      if (isDuplicated) {
        throw new GQLError({ code: ERROR_CODES.EMAIL_IN_USE });
      }

      user.email = rest.email;
    }

    if (rest.password) {
      const saltedHashPassword = await this.utils.genSaltedHashPassword(
        rest.password
      );

      user.password = saltedHashPassword;
    }

    const updatedUser = await user.save();

    return updatedUser;
  }
}
