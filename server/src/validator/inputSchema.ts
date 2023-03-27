import { z } from 'zod';
import { AD_STATUS, AD_TYPE } from '../modules/ad/ad.enums';
import { ITEM_CATEGORY } from '../modules/itemCategory/itemCategory.enums';

// TODO: move to app configs
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 20;
const MIN_NUM_OF_ITEM_CATEGORIES_OF_AD = 1;
const MAX_NUM_OF_ITEM_CATEGORIES_OF_AD = 3;

// sync zod schema with input classes of each module
export const inputSchema = {
  common: {
    singleIdInput: z.object({
      id: z.number(),
    }),
  },
  ad: {
    createAd: z.object({
      title: z.string(),
      description: z.string(),
      type: z.nativeEnum(AD_TYPE),
      categories: z
        .array(z.nativeEnum(ITEM_CATEGORY))
        .min(MIN_NUM_OF_ITEM_CATEGORIES_OF_AD)
        .max(MAX_NUM_OF_ITEM_CATEGORIES_OF_AD),
      price: z.number().min(0),
      location: z.string(),
      contact: z.string().optional(),
    }),
    updateAd: z.object({
      id: z.number(),
      title: z.string().optional(),
      description: z.string().optional(),
      type: z.nativeEnum(AD_TYPE).optional(),
      status: z.nativeEnum(AD_STATUS).optional(),
      categories: z
        .array(z.nativeEnum(ITEM_CATEGORY))
        .min(MIN_NUM_OF_ITEM_CATEGORIES_OF_AD)
        .max(MAX_NUM_OF_ITEM_CATEGORIES_OF_AD)
        .optional(),
      price: z.number().min(0).optional(),
      location: z.string().optional(),
      contact: z.string().nullable().optional(),
    }),
  },
  auth: {
    signup: z.object({
      email: z.string().email({ message: 'Invalid email' }),
      password: z
        .string()
        .min(MIN_PASSWORD_LENGTH, {
          message: 'Password must longer than 8 charactors',
        })
        .max(MAX_PASSWORD_LENGTH, {
          message: 'Password length cannot exceed 20 characters',
        }),
    }),
    signin: z.object({
      email: z.string().email(),
      password: z.string().min(MIN_PASSWORD_LENGTH).max(MAX_PASSWORD_LENGTH),
    }),
  },
  user: {
    update: z.object({
      id: z.number(),
      email: z.string().email({ message: 'Invalid email' }).optional(),
      password: z
        .string()
        .min(MIN_PASSWORD_LENGTH, {
          message: 'Password must longer than 8 charactors',
        })
        .max(MAX_PASSWORD_LENGTH, {
          message: 'Password length cannot exceed 20 characters',
        })
        .optional(),
    }),
  },
};
