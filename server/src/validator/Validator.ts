import { ZodError } from 'zod';
import { ERROR_CODES } from '../error/ErrorCodes';
import { GQLError } from '../error/GQLError';
import { SignupInput } from '../modules/user/user.input';
import { inputSchema } from './inputSchema';

export class Validator {
  private static inputSchema = inputSchema;

  static validateInput(input: unknown, inputType: unknown) {
    const { user } = this.inputSchema;

    try {
      switch (inputType) {
        case SignupInput:
          user.signup.parse(input);
          break;
        default:
          throw new GQLError({
            message: 'Input type undefined',
            code: ERROR_CODES.INPUT_TYPE_UNDEFINED,
          });
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
        message: 'Invalid input',
        code: ERROR_CODES.INVALID_INPUT,
        data: { messages },
      });
    }

    return new GQLError({ message: 'Unknown input validation error' });
  }
}
