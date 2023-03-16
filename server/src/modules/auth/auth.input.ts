import { GraphQLInt, GraphQLString } from 'graphql';
import { Field, InputType } from 'type-graphql';
import { IAuthSigninInput, IAuthSignupInput } from '../../validator/inputTypes';

@InputType()
export class SignupInput implements IAuthSignupInput {
  @Field(() => GraphQLString, { nullable: false })
  email!: string;

  @Field(() => GraphQLString, { nullable: false })
  password!: string;
}

@InputType()
export class SigninInput implements IAuthSigninInput {
  @Field(() => GraphQLString, { nullable: false })
  email!: string;

  @Field(() => GraphQLString, { nullable: false })
  password!: string;
}
