import { ERROR_CODES } from './ErrorCodes';

export const ERROR_MESSAGES: { [key: number]: string } = {
  [ERROR_CODES.UNKNOWN]: 'Unknwon error',

  [ERROR_CODES.NOT_FOUND]: 'Not found',

  [ERROR_CODES.INPUT_TYPE_UNDEFINED]: 'Input type undefined',

  [ERROR_CODES.INVALID_INPUT]: 'Invalid input',

  [ERROR_CODES.EMAIL_IN_USE]: 'Email is in use',
};
