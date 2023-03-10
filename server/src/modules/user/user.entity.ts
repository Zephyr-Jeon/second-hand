import { GraphQLInt } from 'graphql';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { INDEX_FIELDS, INDEX_NAMES } from '../../db/indices';
import { CommonEntity } from '../common/CommonEntity';
import { ICommonEntity } from '../common/interfaces';

interface IUser extends ICommonEntity {
  id: number;
  email: string;
  password: string;
}

@Entity()
@ObjectType({ description: 'General End User' })
@Index(INDEX_NAMES.UX_USER_EMAIL, INDEX_FIELDS[INDEX_NAMES.UX_USER_EMAIL], {
  unique: true,
})
export class User extends CommonEntity implements IUser {
  @Field(() => GraphQLInt)
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Field()
  @Column()
  email!: string;

  @Column()
  password!: string;
}
