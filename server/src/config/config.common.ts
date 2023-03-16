import {
  IJWTConfigs,
  IServerBaseConfigs,
  IServerConfigs,
  ITypeGraphQLConfigs,
  ITypeORMConfigs,
} from './config.interface';

const BASE_CONFIGS: IServerBaseConfigs = {
  PORT: 8082,
  SERVER_URL: 'http://localhost:8082',
  COOKIE_SECRET: process.env.COOKIE_SECRET!,
};

const JWT_CONFIGS: IJWTConfigs = {
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPERATION_TIME: 24 * 60 * 60,
};

const TYPEORM_CONFIGS: ITypeORMConfigs = {
  TYPEORM_TYPE: 'postgres',
  TYPEORM_HOST: 'localhost',
  TYPEORM_PORT: 5432,
  TYPEORM_USERNAME: process.env.TYPEORM_USERNAME!,
  TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD!,
  TYPEORM_DATABASE: 'postgres',
  TYPEORM_DROP_SCHEMA: true,
  TYPEORM_SYNCHRONIZE: true,
  TYPEORM_ENTITIES: [__dirname + '/../modules/**/*.entity.ts'],
};

const TYPEGQL_CONFIGS: ITypeGraphQLConfigs = {
  TYPEGQL_EMIT_SCHEMA_FILE: true,
  TYPEGQL_RESOLVERS: [__dirname + '/../modules/**/*.resolver.ts'],
};

export const COMMON_SERVER_CONFIGS: IServerConfigs = Object.assign(
  {},
  BASE_CONFIGS,
  JWT_CONFIGS,
  TYPEORM_CONFIGS,
  TYPEGQL_CONFIGS
);
