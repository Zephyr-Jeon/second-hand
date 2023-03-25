import { GraphQLInt } from 'graphql';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../common/CommonEntity';
import { ITEM_CATEGORY } from './itemCategory.enums';
import { IItemCategory } from './itemCategory.interfaces';

@Entity({ name: 'item_categories' })
@ObjectType({ description: 'Category of item' })
export class ItemCategory extends CommonEntity implements IItemCategory {
  @Field(() => GraphQLInt, { nullable: false })
  @PrimaryGeneratedColumn({ type: 'int' })
  readonly id!: number;

  @Field(() => ITEM_CATEGORY, { nullable: false })
  @Column('enum', { enum: ITEM_CATEGORY, nullable: false })
  type!: ITEM_CATEGORY;
}
