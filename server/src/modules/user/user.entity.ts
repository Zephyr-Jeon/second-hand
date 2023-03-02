import { GraphQLInt } from 'graphql';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../common/CommonEntity';
import { ICommonEntity } from '../common/interfaces';

interface IUser extends ICommonEntity {
  id: number;
  email: string;
  password: string;
}

@Entity()
@ObjectType({ description: 'General End User' })
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
