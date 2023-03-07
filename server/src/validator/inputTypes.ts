import { z } from 'zod';
import { inputSchema } from './inputSchema';

const { user } = inputSchema;

// extract the inferred type
export type IUserSignupInput = z.infer<typeof user.signup>;
