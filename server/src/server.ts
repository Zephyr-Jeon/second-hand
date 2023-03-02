import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { app } from './app';

export const dataSource = new DataSource({
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

const startServer = async () => {
  console.log('Starting up.....');

  let retries = 5;
  while (retries) {
    try {
      await dataSource.initialize();

      console.log('Data Source has been initialized!');

      break;
    } catch (err) {
      console.error('Error during Data Source initialization', err);

      retries = retries - 1;

      console.log(`retries left ${retries}`);

      await new Promise((res) => setTimeout(res, 3000));
    }
  }

  app.listen({ port: 3000 }, () => {
    console.log(`🚀 Server ready at http://localhost:3000`);
  });
};

startServer();
