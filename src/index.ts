import express from 'express';
import cors from 'cors';

import { CLIENT_URL, PORT } from './config/constants';
import sequelize from './config/db';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { router } from './routes';

const server = express();

server.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}));

server.use(express.json());
server.use('/api', router);
server.use(errorMiddleware);

sequelize.authenticate().then(() => {
  server.listen(PORT, () => {
    console.log(`⚡ Server listening on port: ${PORT}`);
  });
});
