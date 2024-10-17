import express, { Request, Response } from 'express';
import { config } from 'dotenv';
import authRoutes from './routes/authRoutes';
import appRoutes from './routes/appRoutes'
import geolocationRoutes from './routes/geolocationRoutes';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

config();

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());
app.use('/', authRoutes, appRoutes, geolocationRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API Node.js com TypeScript funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});