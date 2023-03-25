import { z } from 'zod';

// TODO: move to app configs
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 20;

// sync zod schema with input classes of each module
export const inputSchema = {
  common: {
    singleIdInput: z.object({
      id: z.number(),
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
