import { ICommonEntity } from '../common/interfaces';
import { ITEM_CATEGORY } from './itemCategory.enums';

export interface IItemCategory extends ICommonEntity {
  id: number;
  type: ITEM_CATEGORY;
}
