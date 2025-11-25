import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import { sequelize } from './config/db';
import app from './app';

const port = Number(process.env.PORT) || 3000;

(async () => {
  try {
    console.log('Starting server: attempting DB authenticate...');
    await sequelize.authenticate();
    console.log('Database authenticated.');

    console.log('Syncing models...');
    await sequelize.sync();
    console.log('Database synced.');

    app.listen(port, () => console.log(`API running on http://localhost:${port}`));
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
