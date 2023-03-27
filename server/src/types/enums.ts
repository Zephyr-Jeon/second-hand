import { registerEnumType } from 'type-graphql';
import { AD_TYPE, AD_STATUS } from '../modules/ad/ad.enums';
import { ITEM_CATEGORY } from '../modules/itemCategory/itemCategory.enums';

export interface I_SERVER_ENUMS {
  COOKIE_NAMES: { [key in keyof typeof COOKIE_NAMES]: COOKIE_NAMES };
  TABLE_NAMES: { [key in keyof typeof TABLE_NAMES]: TABLE_NAMES };
}

enum COOKIE_NAMES {
  TOKEN = 'TOKEN',
}

export enum TABLE_NAMES {
  AD = 'ads',
  AD_HAS_ITEM_CATEGORY = 'ads_has_item_categories',
  ITEM_CATEGORY = 'item_categories',
  USER = 'users',
}

export const SERVER_ENUMS: I_SERVER_ENUMS = {
  COOKIE_NAMES,
  TABLE_NAMES,
};

export const registerAppEnums = () => {
  registerEnumType(AD_TYPE, {
    name: 'AD_TYPE',
    description: 'Type of ad (buy, sell)',
  });
  registerEnumType(AD_STATUS, {
    name: 'AD_STATUS',
    description: 'Status of ad (available, reserved, done)',
  });
  registerEnumType(ITEM_CATEGORY, {
    name: 'ITEM_CATEGORY',
    description: 'Category of item advertising',
  });
};
