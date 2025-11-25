import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => res.json({ ok: true, service: 'pickled-api' }));
app.use('/products', productsRouter);

export default app;
