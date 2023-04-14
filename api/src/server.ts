import 'reflect-metadata';
import express from 'express';
import { routes } from './routes';

const app = express();
const PORT = 8080;

app.use(express.json());

app.use(routes);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
