// src/server.ts
import dotenv from 'dotenv';
import app from './app';
import { sequelize, PORT as DEFAULT_PORT } from './config';

dotenv.config();

const port = process.env.PORT ? Number(process.env.PORT) : DEFAULT_PORT || 3000;

(async function start() {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Database connection OK');

    // Sync models (use { alter: true } or { force: true } only when you understand the effects)
    await sequelize.sync();
    // eslint-disable-next-line no-console
    console.log('Models synchronized');

    app.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`API listening on http://localhost:${port}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();
