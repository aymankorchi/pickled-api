// scripts/seed.ts
import dotenv from 'dotenv';
dotenv.config();

import { sequelize } from '../src/config';
import { Product } from '../src/models';

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Database connection OK (seed)');

    // Sync models without destructive force by default
    await sequelize.sync();
    console.log('Models synchronized (seed)');

    const count = await Product.count();
    if (count > 0) {
      console.log(`Skipping seeding: ${count} product(s) already exist.`);
      process.exit(0);
    }

    const products = [
      { name: 'Toothbrush', description: 'Soft bristles', price: 2.99, stock: 100 },
      { name: 'Shampoo', description: 'Gentle daily shampoo', price: 6.5, stock: 50 },
      { name: 'Notebook', description: 'A5 ruled notebook', price: 3.25, stock: 200 },
    ];

    for (const p of products) {
      await Product.create(p);
      console.log(`Seeded product: ${p.name}`);
    }

    console.log('Seeding complete.');
    process.exit(0);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Seeding failed', err);
    process.exit(1);
  }
}

seed();
