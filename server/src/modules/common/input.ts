import { IsInt } from 'class-validator';
import { GraphQLInt } from 'graphql';
import { InputType, Field } from 'type-graphql';
import { ISingleIdInput } from '../../validator/inputTypes';

@InputType({ description: 'Single id input' })
export class SingleIdInput implements ISingleIdInput {
  @IsInt()
  @Field(() => GraphQLInt, { description: 'ID', nullable: false })
  id!: number;
}
