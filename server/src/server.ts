import 'reflect-metadata';
import { AppServer } from './app';

const startServer = async () => {
  const server = new AppServer({});

  server.startServer().catch((err) => {
    console.log(err);
  });
};

startServer();
