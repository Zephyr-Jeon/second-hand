import { GraphQLInt, GraphQLString } from 'graphql';
import { Field, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { INDEX_FIELDS, INDEX_NAMES } from '../../db/indices';
import { Ad } from '../ad/ad.entity';
import { CommonEntity } from '../common/CommonEntity';
import { IUser } from './user.interfaces';

@Entity()
@ObjectType({ description: 'General End User' })
@Index(INDEX_NAMES.UX_USER_EMAIL, INDEX_FIELDS[INDEX_NAMES.UX_USER_EMAIL], {
  unique: true,
})
export class User extends CommonEntity implements IUser {
  @Field(() => GraphQLInt, { nullable: false })
  @PrimaryGeneratedColumn({ type: 'int' })
  readonly id!: number;

  @Field(() => GraphQLString, { nullable: false })
  @Column('varchar', { nullable: false })
  email!: string;

  @Column('varchar', { nullable: false })
  password!: string;

  @Field(() => [Ad], { nullable: false })
  @OneToMany(() => Ad, (ad) => ad.user)
  ads!: Ad[];
}
