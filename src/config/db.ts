// src/config/db.ts
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import models from '../models'; // default export is an array of model classes

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'pickled',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  models, // explicit array of model classes
  logging: (msg) => console.log('[Sequelize]', msg),
});
