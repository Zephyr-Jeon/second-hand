import { NonEmptyArray } from 'type-graphql';

export interface IServerConfigs
  extends IServerBaseConfigs,
    IJWTConfigs,
    ITypeORMConfigs,
    ITypeGraphQLConfigs {}

export interface IServerBaseConfigs {
  PORT: number;
  SERVER_URL: string;
  COOKIE_SECRET: string;
}

export interface IJWTConfigs {
  JWT_SECRET: string;
  JWT_EXPERATION_TIME: number;
}

export interface ITypeORMConfigs {
  TYPEORM_TYPE: 'postgres';
  TYPEORM_HOST: string;
  TYPEORM_PORT: number;
  TYPEORM_USERNAME: string;
  TYPEORM_PASSWORD: string;
  TYPEORM_DATABASE: string;
  TYPEORM_DROP_SCHEMA: boolean;
  TYPEORM_SYNCHRONIZE: boolean;
  TYPEORM_ENTITIES: string[];
}

export interface ITypeGraphQLConfigs {
  TYPEGQL_EMIT_SCHEMA_FILE: boolean;
  TYPEGQL_RESOLVERS: NonEmptyArray<string>;
}
