import { z } from 'zod';
import { inputSchema } from './inputSchema';

const { common, auth, user } = inputSchema;

// extract the inferred type
export type ISingleIDInput = z.infer<typeof common.singleIDInput>;

export type IAuthSignupInput = z.infer<typeof auth.signup>;
export type IAuthSigninInput = z.infer<typeof auth.signin>;

export type IUpdateUserInput = z.infer<typeof user.update>;
