import express from 'express';
import { SERVER_PORT, SERVER_URL } from './env/server.env';
import { router } from './routers';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(express.json());

app.use(router);
app.use(errorHandler);

const server = app.listen(SERVER_PORT, () => {
  console.info(`Server is running at ${SERVER_URL}`);
});

server.on('error', (error) => {
  console.error(`Error starting server: ${error.message}`);
});