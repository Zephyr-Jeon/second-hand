import { DI } from '../../di/DI';
import { userSigninService } from './services/signin';
import { userSignoutService } from './services/signout';
import { userSignupService } from './services/signup';
import { User } from './user.entity';
import { UpdateUserInput } from './user.input';

@DI.register()
export class UserService {
  readonly userRepo = DI.db.getRepository(User);
  readonly utils = DI.utils;

  readonly create = userSignupService(this);
  readonly signin = userSigninService(this);
  readonly signout = userSignoutService(this);

  async findOneById(id: number) {
    const user = await this.userRepo.findOneBy({ id });

    if (!user) {
      throw new Error('Not found');
    }

    return user;
  }

  async findUsers() {
    return this.userRepo.find();
  }

  async updateUser({ id, ...rest }: UpdateUserInput) {
    const user = await this.findOneById(id);

    if (!user) {
      throw new Error('User not found');
    }

    if (rest.email) {
      user.email = rest.email;
    }

    if (rest.password) {
      user.password = rest.password;
    }

    const updatedUser = await user.save();

    return updatedUser;
  }
}
