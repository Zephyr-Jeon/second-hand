import { GraphQLInt, GraphQLString } from 'graphql';
import { Field, InputType } from 'type-graphql';
import { IUpdateUserInput } from '../../validator/inputTypes';

@InputType()
export class UpdateUserInput implements IUpdateUserInput {
  @Field(() => GraphQLInt, { nullable: false })
  id!: number;

  @Field(() => GraphQLString, { nullable: true })
  email?: string;

  @Field(() => GraphQLString, { nullable: true })
  password?: string;
}
