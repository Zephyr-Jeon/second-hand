import { z } from 'zod';
import { inputSchema } from './inputSchema';

const { common, ad, auth, user } = inputSchema;

// extract the inferred type
export type ISingleIdInput = z.infer<typeof common.singleIdInput>;

export type ICreateAdInput = z.infer<typeof ad.createAd>;
export type IUpdateAdInput = z.infer<typeof ad.updateAd>;

export type IAuthSignupInput = z.infer<typeof auth.signup>;
export type IAuthSigninInput = z.infer<typeof auth.signin>;

export type IUpdateUserInput = z.infer<typeof user.update>;
