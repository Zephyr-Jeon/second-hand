import Container, { Service } from 'typedi';
import { DataSource } from 'typeorm';
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
}
