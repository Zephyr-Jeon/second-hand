import * as dotenv from 'dotenv';
import path from 'path';
import { COMMON_SERVER_CONFIGS } from './config.common';
import { PROD_SERVER_CONFIGS } from './config.prod';
import { TEST_SERVER_CONFIGS } from './config.test';

export function getAppConfigs() {
  if (!process.env.NODE_ENV) {
    throw new Error('NODE_ENV is undefined');
  }

  const envPath =
    process.env.NODE_ENV === 'test'
      ? path.join(__dirname, `../../.development.env`)
      : path.join(__dirname, `../../.${process.env.NODE_ENV}.env`);

  const { parsed, error } = dotenv.config({ path: envPath });

  if (error) {
    throw new Error(JSON.stringify(error));
  }

  if (process.env.NODE_ENV === 'production') {
    return Object.assign(PROD_SERVER_CONFIGS, parsed);
  } else if (process.env.NODE_ENV === 'test') {
    return Object.assign(TEST_SERVER_CONFIGS, parsed);
  } else {
    return Object.assign(COMMON_SERVER_CONFIGS, parsed);
  }
}
