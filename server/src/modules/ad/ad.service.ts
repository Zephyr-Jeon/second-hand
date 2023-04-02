import { DI } from '../../di/DI';
import { ERROR_CODES } from '../../error/ErrorCodes';
import { GQLError } from '../../error/GQLError';
import { ICTX } from '../../types/interfaces';
import { CommonResponse } from '../common/CommonResponse';
import { ICommonEntity } from '../common/interfaces';
import { ItemCategory } from '../itemCategory/itemCategory.entity';
import { ITEM_CATEGORY } from '../itemCategory/itemCategory.enums';
import {
  CreateAdInput,
  GetPaginatedListOfAdsInput,
  UpdateAdInput,
} from './ad.input';
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

  async getOneById(id: number) {
    const ad = await this.adRepo.findOneBy({ id });

    if (!ad) {
      return new GQLError({ code: ERROR_CODES.NOT_FOUND });
    }

    return ad;
  }

  async getPaginatedList(input: GetPaginatedListOfAdsInput) {
    const {
      page,
      pageSize,
      keyword,
      categories,
      location,
      minPrice,
      maxPrice,
      status,
      type,
    } = input;

    const keywordFilter = `WHERE ads."title" LIKE '%${keyword ?? ''}%'`;
    const typeFilter = type ? `AND ads."type" IN ('${type}')` : ``;
    const statusFilter = status ? `AND ads."status" IN ('${status}')` : ``;
    const minPriceFilter =
      minPrice === undefined ? `` : `AND ads."price" >= ${minPrice}`;
    const maxPriceFilter =
      maxPrice === undefined ? `` : `AND ads."price" <= ${maxPrice}`;

    const categoryFilter = () => {
      if (!categories || categories.length === 0) {
        return ``;
      }

      return `
              AND 
                (
                  ${categories.map(
                    (category, index) =>
                      `${
                        index !== 0 ? 'OR ' : ``
                      }joinedAhic."categories"::jsonb @> '[{"name": "${category}"}]'`
                  )}
                )
             `;
    };

    const query = `
      WITH 
        joinedAhic AS
        (
          SELECT ahic."adsId", json_agg(ic) AS categories
          FROM ads_has_item_categories AS ahic
          INNER JOIN item_categories AS ic ON ic."id" = ahic."itemCategoriesId"
          GROUP BY ahic."adsId"
        ),
        joinedAds AS
        (
          SELECT ads.*, to_json(users) AS "user", joinedAhic."categories"
          FROM ads  
          INNER JOIN users ON users."id" = ads."userId" 
          INNER JOIN joinedAhic ON joinedAhic."adsId" = ads."id"
          ${keywordFilter}
          ${typeFilter}
          ${statusFilter}
          ${minPriceFilter}
          ${maxPriceFilter}
          ${categoryFilter()}
          ORDER BY ads."createdAt" DESC
          OFFSET ${pageSize * (page - 1)}
          LIMIT ${pageSize}
        )

      SELECT * FROM joinedAds;
    `;

    const ads = await this.adRepo.query(query);

    return ads;
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
