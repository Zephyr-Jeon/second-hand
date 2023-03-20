import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
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

export const formatError = (error: GraphQLFormattedError) => {
  switch (error.extensions?.code) {
    case ApolloServerErrorCode.BAD_USER_INPUT:
      error.extensions.code = ERROR_CODES.INVALID_INPUT;
      error.extensions.message = ERROR_MESSAGES[ERROR_CODES.INVALID_INPUT];
      break;
  }

  return error;
};
