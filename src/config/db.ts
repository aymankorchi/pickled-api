import { sequelize } from './index';
import * as models from '../models';

// remove sequelize from the models object so it doesn't overwrite the explicit property
const { sequelize: _unused, ...modelExports } = models;

export const db = {
  sequelize,
  ...modelExports,
};

export default db;