// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import productsRouter from './routes/products';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(helmet());
app.use(cors({ origin: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use('/products', productsRouter);

// health
app.get('/health', (req, res) => res.json({ ok: true }));

// error handler last
app.use(errorHandler);

export default app;
