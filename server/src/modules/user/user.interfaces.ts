import { ICommonEntity } from '../common/interfaces';

export interface IUser extends ICommonEntity {
  id: number;
  email: string;
  password: string;
}
