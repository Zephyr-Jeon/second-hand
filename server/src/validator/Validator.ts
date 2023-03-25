import { ZodError } from 'zod';
import { ERROR_CODES } from '../error/ErrorCodes';
import { GQLError } from '../error/GQLError';
import { SigninInput, SignupInput } from '../modules/auth/auth.input';
import { SingleIdInput } from '../modules/common/input';
import { UpdateUserInput } from '../modules/user/user.input';
import { inputSchema } from './inputSchema';

export class Validator {
  private static inputSchema = inputSchema;

  static validateInput(input: unknown, inputType: unknown) {
    const { common, auth, user } = this.inputSchema;

    try {
      switch (inputType) {
        case SingleIdInput:
          common.singleIdInput.parse(input);
          break;
        case SignupInput:
          auth.signup.parse(input);
          break;
        case SigninInput:
          auth.signin.parse(input);
          break;
        case UpdateUserInput:
          user.update.parse(input);
          break;
        default:
          throw new GQLError({ code: ERROR_CODES.INPUT_TYPE_UNDEFINED });
      }
    } catch (e) {
      throw this.formatError(e);
    }
  }

  private static formatError(error: unknown) {
    if (error instanceof GQLError) {
      return error;
    }

    if (error instanceof ZodError) {
      const messages = error.issues.map((issue) => issue.message);

      return new GQLError({
        code: ERROR_CODES.INVALID_INPUT,
        data: { messages },
      });
    }

    return new GQLError({ code: ERROR_CODES.UNKNOWN, data: { error } });
  }
}
