import { registerEnumType } from 'type-graphql';
import { AD_TYPE, AD_STATUS } from '../modules/ad/ad.enums';
import { ITEM_CATEGORY } from '../modules/itemCategory/itemCategory.enums';

export interface I_SERVER_ENUMS {
  COOKIE_NAMES: { [key in COOKIE_NAMES]: COOKIE_NAMES };
}

enum COOKIE_NAMES {
  TOKEN = 'TOKEN',
}

export const SERVER_ENUMS: I_SERVER_ENUMS = {
  COOKIE_NAMES,
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
    name: 'AD_CATEGORY',
    description: 'Category of item advertising',
  });
};
