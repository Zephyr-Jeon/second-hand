import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { buildSchema } from 'type-graphql';
import { DataSource } from 'typeorm';
import { IServerConfigs } from './config/config.interface';
import { DI } from './di/DIContainer';
import { DI_KEYS } from './di/DIKeys';
import { ServerCommonUtils } from './utils/utils';
import { Validator } from './validator/Validator';

export class AppServer {
  private app = express();
  private db: DataSource;
  private di = DI;

  constructor(private configs: IServerConfigs) {
    this.db = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      dropSchema: true,
      synchronize: true,
      entities: ['./src/modules/**/*.entity.ts'],
    });
  }

  async startServer() {
    console.log('Starting up.....');

    this.setDIs();

    await this.initDB();

    this.useMiddlewares();

    await this.runApolloServer();

    this.app.listen({ port: 3000 }, () => {
      console.log(`🚀 Server ready at http://localhost:3000`);
    });
  }

  private setDIs() {
    this.di.set(DI_KEYS.DB, this.db);
    this.di.set(DI_KEYS.UTILS, new ServerCommonUtils());
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
    this.app.use('/', express.json(), cors<cors.CorsRequest>());
  }

  private async runApolloServer() {
    // httpServer handles incoming requests to Express app.
    // by telling Apollo Server to "drain" this httpServer,
    // enable servers to shut down gracefully.
    const httpServer = http.createServer(this.app);

    const apolloServer = new ApolloServer({
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
      schema: await this.buildGraphQLSchema(),
    });

    await apolloServer.start();

    this.app.use('/', expressMiddleware(apolloServer));
    console.log('Apollo server has started');
  }

  private buildGraphQLSchema() {
    return buildSchema({
      emitSchemaFile: true,
      validate: this.validate,
      resolvers: [__dirname + '/modules/**/*.resolver.ts'],
      container: this.di.container,
    });
  }

  private validate(arg: unknown, argType: unknown) {
    if (!arg) {
      return;
    }

    Validator.validateInput(arg, argType);
  }
}
