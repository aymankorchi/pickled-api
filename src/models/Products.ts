// src/models/Products.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config';

export class Product extends Model {
  public id!: number;
  public name!: string;
  public description?: string;
  public price!: number;
  public stock!: number;
}

Product.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { sequelize, modelName: 'Product', tableName: 'products' }
);
