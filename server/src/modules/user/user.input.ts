import { GraphQLInt, GraphQLString } from 'graphql';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => GraphQLInt, { nullable: false })
  id!: number;

  @Field(() => GraphQLString, { nullable: true })
  email?: string;

  @Field(() => GraphQLString, { nullable: true })
  password?: string;
}
