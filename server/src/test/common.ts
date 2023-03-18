import { AppServer } from '../app';
import { getAppConfigs } from '../config/getAppConfigs';

export let testServer: AppServer;

export const ba = async () => {
  testServer = new AppServer(getAppConfigs());
  await testServer.startServer();
};

export const aa = async () => {
  await testServer.resetDB();
  await testServer.stop();
};

export const be = async () => {};

export const ae = async () => {};
