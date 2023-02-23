import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { app } from './app';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'postgres',
  synchronize: true,
  // entities: ['src/module/**/entities/*'],
});

const startServer = async () => {
  console.log('Starting up.....');

  app.get('/test', (req, res) => {
    res.send('Test!');
  });

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

  app.listen({ port: 3000 }, () =>
    console.log(`🚀 Server ready at http://localhost:3000`)
  );
};

startServer();
