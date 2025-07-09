import express from 'express';
import { SERVER_PORT, SERVER_URL } from '../env/server.env';

const app = express();

const port = SERVER_PORT;

app.use(express.json());

app.listen(port, (error: Error) => {
  if (error) {
    console.error(`Error starting server: ${error.message}`);
    return;
  }
  console.info(`Server is running at ${SERVER_URL}`);
})