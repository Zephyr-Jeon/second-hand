import { GraphQLInt, GraphQLString } from 'graphql';
import { Field, InputType } from 'type-graphql';
import {
  ICreateAdInput,
  IGetPaginatedListOfAdsInput,
  IUpdateAdInput,
} from '../../validator/inputTypes';
import { PaginatedListInput } from '../common/input';
import { ITEM_CATEGORY } from '../itemCategory/itemCategory.enums';
import { AD_STATUS, AD_TYPE } from './ad.enums';

@InputType()
export class CreateAdInput implements ICreateAdInput {
  @Field(() => GraphQLString, { nullable: false })
  title!: string;

  @Field(() => GraphQLString, { nullable: false })
  description!: string;

  @Field(() => AD_TYPE, { nullable: false })
  type!: AD_TYPE;

  @Field(() => [ITEM_CATEGORY], { nullable: false })
  categories!: ITEM_CATEGORY[];

  @Field(() => GraphQLInt, { nullable: false })
  price!: number;

  @Field(() => GraphQLString, { nullable: false })
  location!: string;

  @Field(() => GraphQLString, { nullable: true })
  contact?: string;
}

@InputType()
export class UpdateAdInput implements IUpdateAdInput {
  @Field(() => GraphQLInt, { nullable: false })
  id!: number;

  @Field(() => GraphQLString, { nullable: true })
  title?: string;

  @Field(() => GraphQLString, { nullable: true })
  description?: string;

  @Field(() => AD_TYPE, { nullable: true })
  type?: AD_TYPE;

  @Field(() => AD_STATUS, { nullable: true })
  status?: AD_STATUS;

  @Field(() => [ITEM_CATEGORY], { nullable: true })
  categories?: ITEM_CATEGORY[];

  @Field(() => GraphQLInt, { nullable: true })
  price?: number;

  @Field(() => GraphQLString, { nullable: true })
  location?: string;

  @Field(() => GraphQLString, { nullable: true })
  contact?: string;
}

@InputType()
export class GetPaginatedListOfAdsInput
  extends PaginatedListInput
  implements IGetPaginatedListOfAdsInput
{
  @Field(() => GraphQLString, { nullable: true })
  keyword?: string;

  @Field(() => AD_TYPE, { nullable: true })
  type?: AD_TYPE;

  @Field(() => AD_STATUS, { nullable: true })
  status?: AD_STATUS;

  @Field(() => [ITEM_CATEGORY], { nullable: true })
  categories?: ITEM_CATEGORY[];

  @Field(() => GraphQLInt, { nullable: true })
  minPrice?: number;

  @Field(() => GraphQLInt, { nullable: true })
  maxPrice?: number;

  @Field(() => GraphQLString, { nullable: true })
  location?: string;
}
