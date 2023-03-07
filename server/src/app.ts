import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';
import http from 'http';
import { buildSchema } from 'type-graphql';
import { Container } from 'typedi';
import { Validator } from './validator/Validator';

export const app = express();

const startApolloServer = async () => {
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  const apolloServer = new ApolloServer({
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    schema: await buildGraphQLSchema(),
  });

  await apolloServer.start();

  app.use(
    '/',
    express.json(),
    cors<cors.CorsRequest>(),
    expressMiddleware(apolloServer)
  );
};

startApolloServer();

function buildGraphQLSchema() {
  return buildSchema({
    emitSchemaFile: true,
    validate,
    resolvers: [__dirname + '/modules/**/*.resolver.ts'],
    container: Container,
  });
}

function validate(arg: unknown, argType: unknown) {
  if (!arg) {
    return;
  }

  Validator.validateInput(arg, argType);
}
