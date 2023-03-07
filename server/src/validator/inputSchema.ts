import { z } from 'zod';

// sync zod schema with input classes of each module
export const inputSchema = {
  user: {
    signup: z.object({
      email: z.string().email({ message: 'Invalid email' }),
      password: z
        .string()
        .min(8, { message: 'Password must longer than 8 charactors' })
        .max(20, { message: 'Password length cannot exceed 20 characters' }),
    }),
  },
};
