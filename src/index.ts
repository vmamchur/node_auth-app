import express, { Request, Response } from 'express';

import { CLIENT_URL, PORT } from './config/constants';
import { authRouter } from './routes/authRouter';
import sequelize from './config/db';

const server = express();

server.use(express.json());
server.use(authRouter);

server.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

sequelize.authenticate().then(() => {
  server.listen(PORT, () => {
    console.log(`⚡ Server listening on port: ${PORT}`);
  });
});
