import express, { Request, Response } from 'express';
import { config } from 'dotenv';
import authRoutes from './routes/authRotes';
import appRoutes from './routes/appRoutes'

config();

const app = express();
const port = 3000;

app.use(express.json());
app.use('/', authRoutes, appRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('API Node.js com TypeScript funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});