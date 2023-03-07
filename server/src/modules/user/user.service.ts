import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { dataSource } from '../../server';
import { User } from './user.entity';
import { UpdateUserInput } from './user.input';
import { userSignupService } from './services/signup';

@Service()
export class UserService {
  readonly userRepo: Repository<User> = dataSource.getRepository(User);

  create = userSignupService(this);

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
