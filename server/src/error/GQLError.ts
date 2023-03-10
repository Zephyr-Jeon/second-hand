import { GraphQLError } from 'graphql';
import { ERROR_CODES } from './ErrorCodes';
import { ERROR_MESSAGES } from './ErrorMessages';

interface IGQLErrorParams {
  code: ERROR_CODES;
  message?: string;
  data?: any;
}

export class GQLError extends GraphQLError {
  constructor({ code, message, data }: IGQLErrorParams) {
    super(message ?? ERROR_MESSAGES[code], {
      extensions: {
        code,
        data,
      },
    });
  }
}
