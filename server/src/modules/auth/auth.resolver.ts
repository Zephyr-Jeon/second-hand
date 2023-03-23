import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { DI } from '../../di/DI';
import { ICTX } from '../../types/interfaces';
import { OkResponse } from '../common/output';
import { User } from '../user/user.entity';
import { SigninInput, SignupInput } from './auth.input';
import { AuthService } from './auth.service';
import { AuthRule } from './AuthRule';

@DI.register()
@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Authorized(AuthRule.public)
  @Mutation((returns) => User)
  async signup(@Arg('input') input: SignupInput, @Ctx() ctx: ICTX) {
    return await this.authService.signup(input, ctx);
  }

  @Authorized(AuthRule.public)
  @Mutation((returns) => User)
  async signin(@Arg('input') input: SigninInput, @Ctx() ctx: ICTX) {
    return await this.authService.signin(input, ctx);
  }

  @Authorized(AuthRule.public)
  @Mutation((returns) => OkResponse)
  async signout(@Ctx() ctx: ICTX) {
    return await this.authService.signout(ctx);
  }
}
