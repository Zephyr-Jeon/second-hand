import { COMMON_SERVER_CONFIGS } from './config.common';
import {
  IJWTConfigs,
  IServerBaseConfigs,
  IServerConfigs,
  ITypeGraphQLConfigs,
  ITypeORMConfigs,
} from './config.interface';

const BASE_CONFIGS: IServerBaseConfigs = {
  PORT: 8084,
  SERVER_URL: 'http://localhost:8084',
  COOKIE_SECRET: 'test',
};

const JWT_CONFIGS: IJWTConfigs = {
  JWT_SECRET: 'test',
  JWT_EXPERATION_TIME: 24 * 60 * 60,
};

const TYPEORM_CONFIGS: ITypeORMConfigs = {
  TYPEORM_TYPE: 'postgres',
  TYPEORM_HOST: 'localhost',
  TYPEORM_PORT: 5432,
  TYPEORM_USERNAME: 'postgres',
  TYPEORM_PASSWORD: 'postgres',
  TYPEORM_DATABASE: 'postgres',
  TYPEORM_DROP_SCHEMA: true,
  TYPEORM_SYNCHRONIZE: true,
  TYPEORM_ENTITIES: [__dirname + '/../modules/**/*.entity.ts'],
};

const TYPEGQL_CONFIGS: ITypeGraphQLConfigs = {
  TYPEGQL_EMIT_SCHEMA_FILE: true,
  TYPEGQL_RESOLVERS: [__dirname + '/../modules/**/*.resolver.ts'],
};

export const TEST_SERVER_CONFIGS: IServerConfigs = Object.assign(
  {},
  COMMON_SERVER_CONFIGS,
  BASE_CONFIGS,
  JWT_CONFIGS,
  TYPEORM_CONFIGS,
  TYPEGQL_CONFIGS
);
