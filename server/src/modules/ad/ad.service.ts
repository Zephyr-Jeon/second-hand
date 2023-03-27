import { DI } from '../../di/DI';
import { ERROR_CODES } from '../../error/ErrorCodes';
import { GQLError } from '../../error/GQLError';
import { TABLE_NAMES } from '../../types/enums';
import { ICTX } from '../../types/interfaces';
import { CommonResponse } from '../common/CommonResponse';
import { ICommonEntity } from '../common/interfaces';
import { ItemCategory } from '../itemCategory/itemCategory.entity';
import { ITEM_CATEGORY } from '../itemCategory/itemCategory.enums';
import { CreateAdInput, GetAdListInput, UpdateAdInput } from './ad.input';
import { IAd } from './ad.interfaces';

@DI.register()
export class AdService {
  readonly adRepo = DI.getAdRepo;
  readonly itemCategoryRepo = DI.getItemCategoryRepo;
  readonly utils = DI.utils;

  async create(input: CreateAdInput, ctx: ICTX) {
    const { categories, ...data } = input;

    const itemCategories = await this.toItemCategories(categories);

    const ad = this.adRepo.create({
      ...data,
      user: ctx.user!,
      categories: itemCategories,
    });

    return await ad.save();
  }

  async update(input: UpdateAdInput, ctx: ICTX) {
    const { id, categories, ...data } = input;

    const ad = await this.adRepo.findOneBy({ id });

    if (!ad) {
      throw new GQLError({ code: ERROR_CODES.NOT_FOUND });
    }

    if (ad.user.id !== ctx.user!.id) {
      throw new GQLError({ code: ERROR_CODES.NOT_PERMITTED });
    }

    if (categories) {
      ad.categories = await this.toItemCategories(categories);
    }

    for (const key in data) {
      type keysToBeOmitted = 'id' | 'user' | 'categories' | keyof ICommonEntity;
      type keyType = keyof Omit<IAd, keysToBeOmitted>;

      if (Object.hasOwnProperty.call(data, key)) {
        Object.assign(ad, { [key]: data[key as keyType] });
      }
    }

    return await ad.save();
  }

  async remove(id: number, ctx: ICTX) {
    const ad = await this.adRepo.findOneBy({ id });

    if (!ad) {
      throw new GQLError({ code: ERROR_CODES.NOT_FOUND });
    }

    if (ad.user.id !== ctx.user!.id) {
      throw new GQLError({ code: ERROR_CODES.NOT_PERMITTED });
    }

    await ad.remove();

    return CommonResponse.ok();
  }

  async findOneById(id: number) {
    const res = await this.adRepo.findOneBy({ id: 1 });
    res!.categories = res!.categories ?? [ITEM_CATEGORY.ARTS];
    return res;
  }

  async find(input: GetAdListInput, ctx: ICTX) {
    const test = await this.adRepo.findOneBy({ id: input.id });
    const test2 = await this.adRepo.findOne({
      relations: {
        categories: true,
      },
      where: {
        id: input.id,
      },
    });

    const test3 = await this.adRepo
      .createQueryBuilder(TABLE_NAMES.AD)
      .leftJoin(`${TABLE_NAMES.AD}.categories`, `categories`)
      // .where( { id: input.id })
      .where('ads.id = :id', { id: input.id })
      .getOne();

    console.log(74, test);
    console.log(75, test2);
    console.log(76, test3);
    return [test!];
  }

  // convert ITEM_CATEGORY[] to ItemCatrgory[]
  private async toItemCategories(categories: ITEM_CATEGORY[]) {
    const itemCategories: ItemCategory[] = [];

    await Promise.all(
      categories.map(async (category) => {
        const itemCategory = await this.itemCategoryRepo.findOneBy({
          name: category,
        });

        itemCategory && itemCategories.push(itemCategory);
      })
    );

    return itemCategories;
  }
}
