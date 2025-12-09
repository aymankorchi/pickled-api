// src/config/index.ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Development fallback — prefer setting DATABASE_URL in .env
const DB_URL = process.env.DATABASE_URL || 'postgres://postgres:19735@localhost:5432/pickled';

export const sequelize = new Sequelize(DB_URL, {
  dialect: 'postgres',
  logging: false,
});

export const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
