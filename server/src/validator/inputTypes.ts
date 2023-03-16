import { z } from 'zod';
import { inputSchema } from './inputSchema';

const { user } = inputSchema;

// extract the inferred type
export type IAuthSignupInput = z.infer<typeof user.signup>;
export type IAuthSigninInput = z.infer<typeof user.signin>;
