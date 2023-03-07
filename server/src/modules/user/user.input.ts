import { GraphQLInt, GraphQLString } from 'graphql';
import { Field, InputType } from 'type-graphql';
import { IUserSignupInput } from '../../validator/inputTypes';

@InputType()
export class SignupInput implements IUserSignupInput {
  @Field(() => GraphQLString, { nullable: false })
  email!: string;

  @Field(() => GraphQLString, { nullable: false })
  password!: string;
}

@InputType()
export class UpdateUserInput {
  @Field(() => GraphQLInt, { nullable: false })
  id!: number;

  @Field(() => GraphQLString, { nullable: true })
  email?: string;

  @Field(() => GraphQLString, { nullable: true })
  password?: string;
}
