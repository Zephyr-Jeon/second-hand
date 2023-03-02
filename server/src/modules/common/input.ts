import { IsInt } from 'class-validator';
import { GraphQLInt } from 'graphql';
import { InputType, Field } from 'type-graphql';

@InputType({ description: 'Single ID input' })
export class SingleIDInput {
  @IsInt()
  @Field(() => GraphQLInt, { description: 'ID', nullable: false })
  id!: number;
}
