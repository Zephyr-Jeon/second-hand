import { ItemCategory } from '../itemCategory/itemCategory.entity';
import { ICommonEntity } from '../common/interfaces';
import { User } from '../user/user.entity';
import { AD_STATUS, AD_TYPE } from './ad.enums';

export interface IAd extends ICommonEntity {
  id: number;
  user: User;
  title: string;
  description: string;
  status: AD_STATUS;
  type: AD_TYPE;
  category: ItemCategory[];
  price: number;
  location: string;
  contact?: string;
}
