import { GraphQLInt, GraphQLString } from 'graphql';
import { Field, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ItemCategory } from '../itemCategory/itemCategory.entity';
import { CommonEntity } from '../common/CommonEntity';
import { User } from '../user/user.entity';
import { AD_STATUS, AD_TYPE } from './ad.enums';
import { IAd } from './ad.interfaces';

@Entity()
@ObjectType({ description: 'Ad for buy and sell' })
export class Ad extends CommonEntity implements IAd {
  @Field(() => GraphQLInt, { nullable: false })
  @PrimaryGeneratedColumn({ type: 'int' })
  readonly id!: number;

  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, (user) => user.ads)
  user!: User;

  @Field(() => GraphQLString, { nullable: false })
  @Column('varchar', { nullable: false })
  title!: string;

  @Field(() => GraphQLString, { nullable: false })
  @Column('varchar', { nullable: false })
  description!: string;

  @Field(() => AD_STATUS, { nullable: false })
  @Column('enum', { enum: AD_STATUS, nullable: false })
  status!: AD_STATUS;

  @Field(() => AD_TYPE, { nullable: false })
  @Column('enum', { enum: AD_TYPE, nullable: false })
  type!: AD_TYPE;

  @Field(() => [ItemCategory], { nullable: false })
  @ManyToMany(() => ItemCategory)
  @JoinTable()
  category!: ItemCategory[];

  @Field(() => GraphQLInt, { nullable: false })
  @Column('int', { nullable: false })
  price!: number;

  @Field(() => GraphQLString, { nullable: false })
  @Column('varchar', { nullable: false })
  location!: string;

  @Field(() => GraphQLString, { nullable: true })
  @Column('varchar', { nullable: true })
  contact?: string;
}