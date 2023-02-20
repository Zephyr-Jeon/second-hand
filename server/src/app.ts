import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import { Resolver, buildSchema, Query } from 'type-graphql';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

@Resolver()
class HelloResolver {
  @Query(() => String)
  hello() {
    return 'Hello Resolver!';
  }
}

export const app = express();

const startApolloServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
  });

  apolloServer.start().then(() => {
    apolloServer.applyMiddleware({ app, path: '/' });
  });
};

startApolloServer();
