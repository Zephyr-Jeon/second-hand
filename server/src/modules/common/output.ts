import { Field, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Simple ok response' })
export class OkResponse {
  @Field()
  ok!: number;
}
