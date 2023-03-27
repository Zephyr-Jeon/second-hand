import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { DI } from '../../di/DI';
import { ICTX } from '../../types/interfaces';
import { AuthRule } from '../auth/AuthRule';
import { SingleIdInput } from '../common/input';
import { OkResponse } from '../common/output';
import { Ad } from './ad.entity';
import { CreateAdInput, GetAdListInput, UpdateAdInput } from './ad.input';
import { AdService } from './ad.service';

@DI.register()
@Resolver(() => Ad)
export class AdResolver {
  constructor(private readonly adService: AdService) {}

  @Authorized(AuthRule.user)
  @Mutation((returns) => Ad)
  async createAd(@Arg('input') input: CreateAdInput, @Ctx() ctx: ICTX) {
    const ad = await this.adService.create(input, ctx);
    return ad;
  }

  @Authorized(AuthRule.user)
  @Mutation((returns) => Ad)
  async updateAd(@Arg('input') input: UpdateAdInput, @Ctx() ctx: ICTX) {
    return await this.adService.update(input, ctx);
  }

  @Authorized(AuthRule.user)
  @Mutation((returns) => OkResponse)
  async removeAd(@Arg('input') input: SingleIdInput, @Ctx() ctx: ICTX) {
    return await this.adService.remove(input.id, ctx);
  }

  @Authorized(AuthRule.public)
  @Query((returns) => Ad)
  async getAdById(@Arg('input') input: SingleIdInput, @Ctx() ctx: ICTX) {
    return await this.adService.findOneById(input.id);
  }

  @Authorized(AuthRule.public)
  @Query((returns) => [Ad])
  async getAdList(@Arg('input') input: GetAdListInput, @Ctx() ctx: ICTX) {
    return await this.adService.find(input, ctx);
  }
}
