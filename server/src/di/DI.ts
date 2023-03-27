import Container, { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { IServerConfigs } from '../config/config.interface';
import { Ad } from '../modules/ad/ad.entity';
import { ItemCategory } from '../modules/itemCategory/itemCategory.entity';
import { User } from '../modules/user/user.entity';
import { I_SERVER_ENUMS } from '../types/enums';
import { ServerCommonUtils } from '../utils/utils';
import { DI_KEYS } from './DIKeys';

export class DI {
  static get container() {
    return Container;
  }

  static register() {
    return Service();
  }

  static set(key: DI_KEYS, value: any) {
    this.container.set(key, value);
  }

  static get db(): DataSource {
    return this.container.get(DI_KEYS.DB);
  }

  static get utils(): ServerCommonUtils {
    return this.container.get(DI_KEYS.UTILS);
  }

  static get serverEnums(): I_SERVER_ENUMS {
    return this.container.get(DI_KEYS.SERVER_ENUMS);
  }

  static get serverConfigs(): IServerConfigs {
    return this.container.get(DI_KEYS.SERVER_CONFIGS);
  }

  static get getAdRepo() {
    return this.db.getRepository(Ad);
  }

  static get getItemCategoryRepo() {
    return this.db.getRepository(ItemCategory);
  }

  static get getUserRepo() {
    return this.db.getRepository(User);
  }
}
