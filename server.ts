import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './src/config/db.config';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  dbConnection()
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});