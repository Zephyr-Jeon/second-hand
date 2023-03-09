import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DI } from '../../di/DI';
import { ICommonEntity } from './interfaces';

// Common entity that most entities inherent
@ObjectType({ isAbstract: true }) // to prevent getting registered in the schema
export class CommonEntity extends BaseEntity implements ICommonEntity {
  utils = DI.utils;

  @Field(() => Date)
  @CreateDateColumn({
    type: 'timestamp with time zone',
    comment: 'created time',
  })
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn({
    type: 'timestamp with time zone',
    comment: 'updated time',
  })
  updatedAt!: Date;

  @BeforeInsert()
  updateDatesForInsert() {
    const now = this.utils.getNowDate();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  updateDatesForUpdate() {
    this.updatedAt = this.utils.getNowDate();
  }
}
