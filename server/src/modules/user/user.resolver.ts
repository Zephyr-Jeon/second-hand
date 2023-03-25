import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { DI } from '../../di/DI';
import { ICTX } from '../../types/interfaces';
import { AuthRule } from '../auth/AuthRule';
import { SingleIdInput } from '../common/input';
import { User } from './user.entity';
import { UpdateUserInput } from './user.input';
import { UserService } from './user.service';

@DI.register()
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Authorized(AuthRule.user)
  @Query((returns) => User)
  async getCurrentUser(@Ctx() ctx: ICTX) {
    return ctx.user;
  }

  @Authorized(AuthRule.public)
  @Query((returns) => User)
  async getUserById(@Arg('input') input: SingleIdInput, @Ctx() ctx: ICTX) {
    const user = await this.userService.findOneById(input.id);
    return user;
  }

  @Authorized(AuthRule.admin)
  @Query((returns) => [User])
  async getUsers() {
    const users = await this.userService.findUsers();
    return users;
  }

  @Authorized(AuthRule.user)
  @Mutation((returns) => User)
  async updateUser(
    @Arg('input')
    input: UpdateUserInput
  ) {
    return await this.userService.updateUser(input);
  }
}
