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

@InputType({ description: 'Input for pagenated list' })
export class PaginatedListInput {
  @IsInt()
  @Field(() => GraphQLInt, { description: 'Page number', nullable: false })
  page!: number;

  @IsInt()
  @Field(() => GraphQLInt, {
    description: 'Number of items in each page',
    nullable: false,
  })
  pageSize!: number;
}
