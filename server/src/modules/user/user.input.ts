import { IsInt, IsString } from 'class-validator';
import { GraphQLInt, GraphQLString } from 'graphql';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUserInput {
  @IsInt()
  @Field(() => GraphQLInt, { nullable: false })
  id!: any;

  @IsString()
  @Field(() => GraphQLString, { nullable: true })
  email?: any;

  @IsString()
  @Field(() => GraphQLString, { nullable: true })
  password?: any;
}
