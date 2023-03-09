import 'reflect-metadata';
import { AppServer } from './app';
import { getAppConfigs } from './config/getAppConfigs';

const startServer = async () => {
  const configs = getAppConfigs();
  const server = new AppServer(configs);

  server.startServer().catch((err) => {
    console.log(err);
  });
};

startServer();
