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
export abstract class CommonEntity extends BaseEntity implements ICommonEntity {
  @Field(() => Date, { nullable: false })
  @CreateDateColumn({
    type: 'timestamp with time zone',
    comment: 'created time',
    nullable: false,
  })
  createdAt!: Date;

  @Field(() => Date, { nullable: false })
  @UpdateDateColumn({
    type: 'timestamp with time zone',
    comment: 'updated time',
    nullable: false,
  })
  updatedAt!: Date;

  @BeforeInsert()
  updateDatesForInsert() {
    const now = DI.utils.getNowDate();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  updateDatesForUpdate() {
    this.updatedAt = DI.utils.getNowDate();
  }
}
