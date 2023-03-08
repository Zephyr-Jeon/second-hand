import { GraphQLError } from 'graphql';
import { ERROR_CODES } from './ErrorCodes';

interface IGQLErrorParams {
  message: string;
  code?: ERROR_CODES;
  data?: any;
}

export class GQLError extends GraphQLError {
  constructor({ message, code = ERROR_CODES.UNKNOWN, data }: IGQLErrorParams) {
    super(message, {
      extensions: {
        code,
        data,
      },
    });
  }
}
