import express from 'express';
import { SERVER_PORT, SERVER_URL } from '../env/server.env';
import { router } from '../routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(SERVER_PORT, (error: Error) => {
  if (error) {
    console.error(`Error starting server: ${error.message}`);
    return;
  }
  console.info(`Server is running at ${SERVER_URL}`);
});