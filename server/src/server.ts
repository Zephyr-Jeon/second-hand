import 'reflect-metadata';
import { app } from './app';

const start = async () => {
  console.log('Starting up.....');

  app.get('/test', (req, res) => {
    res.send('Test!');
  });

  app.listen({ port: 3000 }, () =>
    console.log(`🚀 Server ready at http://localhost:3000`)
  );
};

start();
