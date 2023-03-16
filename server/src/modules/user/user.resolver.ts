import { Resolver, Query, Arg, Mutation } from 'type-graphql';
import { DI } from '../../di/DI';
import { SingleIDInput } from '../common/input';
import { User } from './user.entity';
import { UpdateUserInput } from './user.input';
import { UserService } from './user.service';

@DI.register()
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => User)
  async getUserById(@Arg('input') input: SingleIDInput) {
    const user = await this.userService.findOneById(input.id);
    return user;
  }

  @Query((returns) => [User])
  async getUsers() {
    const users = await this.userService.findUsers();
    return users;
  }

  @Mutation((returns) => User)
  async updateUser(
    @Arg('input')
    input: UpdateUserInput
  ) {
    return await this.userService.updateUser(input);
  }
}
