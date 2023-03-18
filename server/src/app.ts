import { ApolloServer } from '@apollo/server';
import {
  ExpressContextFunctionArgument,
  expressMiddleware,
} from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import * as TypeGraphQL from 'type-graphql';
import * as TypeORM from 'typeorm';
import { IServerConfigs } from './config/config.interface';
import { DI } from './di/DI';
import { DI_KEYS } from './di/DIKeys';
import { SERVER_ENUMS } from './types/enums';
import { ICTX, IJWTPayload } from './types/interfaces';
import { ServerCommonUtils } from './utils/utils';
import { Validator } from './validator/Validator';

export class AppServer {
  private db: TypeORM.DataSource;
  private app = express();
  private di = DI;
  private httpServer: http.Server | null = null;
  public apolloServer: ApolloServer | null = null;

  constructor(private configs: IServerConfigs) {
    this.db = new TypeORM.DataSource({
      type: configs.TYPEORM_TYPE,
      host: configs.TYPEORM_HOST,
      port: configs.TYPEORM_PORT,
      username: configs.TYPEORM_USERNAME,
      password: configs.TYPEORM_PASSWORD,
      database: configs.TYPEORM_DATABASE,
      dropSchema: configs.TYPEORM_DROP_SCHEMA,
      synchronize: configs.TYPEORM_SYNCHRONIZE,
      entities: configs.TYPEORM_ENTITIES,
    });
  }

  async startServer() {
    console.log('Starting up.....');

    this.setDIs();

    await this.initDB();

    this.useMiddlewares();

    await this.runApolloServer();

    this.httpServer = this.app.listen({ port: this.configs.PORT }, () => {
      console.log(`🚀 Server ready at ${this.configs.SERVER_URL}`);
    });
  }

  async stop() {
    await this.db.destroy();
    this.httpServer?.close?.();
  }

  async resetDB() {
    if (this.db) {
      this.db.dropDatabase();
      this.db.synchronize();
    }
  }

  get url() {
    return this.configs.SERVER_URL;
  }

  private setDIs() {
    this.di.set(DI_KEYS.DB, this.db);
    this.di.set(DI_KEYS.UTILS, new ServerCommonUtils());
    this.di.set(DI_KEYS.SERVER_ENUMS, SERVER_ENUMS);
    this.di.set(DI_KEYS.SERVER_CONFIGS, this.configs);
  }

  private async initDB() {
    let retries = 5;

    while (retries > -1) {
      try {
        await this.db.initialize();

        console.log('Data Source has been initialized');

        break;
      } catch (err) {
        console.error('Error occurs during Data Source initialization !', err);

        retries = retries - 1;
        console.log(`Retries left ${retries}`);

        if (retries < 0) {
          throw new Error('Data Source initialization failed !');
        }

        await new Promise((res) => setTimeout(res, 3000));
      }
    }
  }

  private useMiddlewares() {
    // The default cors configuration is the equivalent of
    // {
    //   "origin": "*",
    //   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    //   "preflightContinue": false,
    //   "optionsSuccessStatus": 204
    // }
    this.app.use(
      cors({
        // origin: ['https://studio.apollographql.com', ' http://localhost:8082'],
        // credentials: true,
      })
    );

    // this.app.set('trust proxy', 1);
    this.app.use(express.json());
    this.app.use(cookieParser(this.configs.COOKIE_SECRET));
  }

  private async runApolloServer() {
    // httpServer handles incoming requests to Express app.
    // by telling Apollo Server to "drain" this httpServer,
    // enable servers to shut down gracefully.
    const httpServer = http.createServer(this.app);

    this.apolloServer = new ApolloServer({
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        // ApolloServerPluginLandingPageLocalDefault({ includeCookies: true }),
      ],
      schema: await this.buildGraphQLSchema(),
    });

    await this.apolloServer.start();

    this.app.use(
      expressMiddleware(this.apolloServer, {
        context: async (ctx) => this.context(ctx),
      })
    );
    console.log('Apollo server has started');
  }

  private buildGraphQLSchema() {
    return TypeGraphQL.buildSchema({
      validate: this.validate,
      container: this.di.container,
      resolvers: this.configs.TYPEGQL_RESOLVERS,
      emitSchemaFile: this.configs.TYPEGQL_EMIT_SCHEMA_FILE,
    });
  }

  private validate(arg: unknown, argType: unknown) {
    if (arg) {
      Validator.validateInput(arg, argType);
    }
  }

  // Each resolver recieves context object that this function returns
  private async context({
    req,
    res,
  }: ExpressContextFunctionArgument): Promise<ICTX> {
    const ctx: ICTX = { req, res };
    const token = req.signedCookies[this.di.serverEnums.COOKIE_NAMES.TOKEN];

    if (token) {
      try {
        const payload = (await this.di.utils.verifyJWT(
          token,
          this.configs.JWT_SECRET
        )) as IJWTPayload;

        ctx.userId = payload.userId;
      } catch (e) {
        res.clearCookie(this.di.serverEnums.COOKIE_NAMES.TOKEN);
        console.log(`Internal JWT verification error: ${e}`);
      }
    }

    return ctx;
  }
}
