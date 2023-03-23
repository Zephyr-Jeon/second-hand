import { IsInt } from 'class-validator';
import { GraphQLInt } from 'graphql';
import { InputType, Field } from 'type-graphql';
import { ISingleIDInput } from '../../validator/inputTypes';

@InputType({ description: 'Single ID input' })
export class SingleIDInput implements ISingleIDInput {
  @IsInt()
  @Field(() => GraphQLInt, { description: 'ID', nullable: false })
  id!: number;
}
