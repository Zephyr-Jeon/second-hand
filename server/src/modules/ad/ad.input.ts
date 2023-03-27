import { GraphQLInt, GraphQLString } from 'graphql';
import { Field, InputType } from 'type-graphql';
import { ICreateAdInput, IUpdateAdInput } from '../../validator/inputTypes';
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

  @Field(() => [ITEM_CATEGORY], { nullable: true })
  categories?: ITEM_CATEGORY[];

  @Field(() => GraphQLInt, { nullable: true })
  price?: number;

  @Field(() => GraphQLString, { nullable: true })
  location?: string;

  @Field(() => GraphQLString, { nullable: true })
  contact?: string;

  @Field(() => AD_STATUS, { nullable: true })
  status?: AD_STATUS;
}

@InputType()
export class GetAdListInput {
  @Field(() => GraphQLInt, { nullable: false })
  id!: number;
}
