import express from 'express';

import './database';
import 'reflect-metadata';

import ErrorHandler from './services/exceptions/ErrorHandler';
import { routes } from './routes';

const app = express();
const PORT = 8080;

app.use(express.json());

app.use(routes);

app.use(ErrorHandler);
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));