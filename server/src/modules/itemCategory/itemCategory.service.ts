import { DI } from '../../di/DI';
import { ITEM_CATEGORY } from './itemCategory.enums';

@DI.register()
export class ItemCategoryService {
  static async createInitialData() {
    const count = await DI.getItemCategoryRepo.count();

    if (count === 0) {
      const categories = Object.values(ITEM_CATEGORY);

      for (const category of categories) {
        await DI.getItemCategoryRepo.create({ name: category }).save();
      }
    }
  }
}
