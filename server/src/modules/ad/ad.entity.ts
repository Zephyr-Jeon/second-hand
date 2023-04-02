import { GraphQLInt, GraphQLString } from 'graphql';
import { Field, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TABLE_NAMES } from '../../types/enums';
import { CommonEntity } from '../common/CommonEntity';
import { ItemCategory } from '../itemCategory/itemCategory.entity';
import { User } from '../user/user.entity';
import { AD_STATUS, AD_TYPE } from './ad.enums';
import { IAd } from './ad.interfaces';

@Entity({ name: TABLE_NAMES.AD })
@ObjectType({ description: 'Ad for buy and sell' })
export class Ad extends CommonEntity implements IAd {
  @Field(() => GraphQLInt, { nullable: false })
  @PrimaryGeneratedColumn({ type: 'int' })
  readonly id!: number;

  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  user!: User;

  @Field(() => GraphQLString, { nullable: false })
  @Column('varchar', { nullable: false })
  title!: string;

  @Field(() => GraphQLString, { nullable: false })
  @Column('varchar', { nullable: false })
  description!: string;

  @Field(() => AD_STATUS, { nullable: false })
  @Column('enum', {
    enum: AD_STATUS,
    default: AD_STATUS.AVAILABLE,
    nullable: false,
  })
  status!: AD_STATUS;

  @Field(() => AD_TYPE, { nullable: false })
  @Column('enum', { enum: AD_TYPE, nullable: false })
  type!: AD_TYPE;

  @Field(() => [ItemCategory], { nullable: false })
  @ManyToMany(() => ItemCategory, { nullable: false, eager: true })
  @JoinTable({ name: TABLE_NAMES.AD_HAS_ITEM_CATEGORY })
  categories!: ItemCategory[];

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
