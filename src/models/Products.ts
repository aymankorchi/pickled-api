// src/models/Product.ts
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'products', timestamps: true })
export class Product extends Model {
  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @Column({ type: DataType.TEXT })
  description?: string;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  price!: number;

  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
  stock!: number;
}
