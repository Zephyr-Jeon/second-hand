import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Utils } from '../../utils/utils';
import { ICommonEntity } from './interface';

// Common entity that most entities inherent
@ObjectType({ isAbstract: true }) // to prevent getting registered in the schema
export class CommonEntity extends BaseEntity implements ICommonEntity {
  @Field(() => Date)
  @CreateDateColumn({ type: 'time with time zone', comment: 'created time' })
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'time with time zone', comment: 'updated time' })
  updatedAt!: Date;

  @BeforeInsert()
  updateDatesForInsert() {
    const now = Utils.getNowDate();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  updateDatesForUpdate() {
    this.updatedAt = Utils.getNowDate();
  }
}
