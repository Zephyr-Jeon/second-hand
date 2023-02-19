import express from 'express';

const app = express();
const router = express.Router();

app.use(express.json());

router.get('/', (req, res) => {
  res.send('Home!');
});

router.get('/test', (req, res) => {
  res.send('Test!');
});

app.use(router);

export { app };
