// tests/products.test.ts
import request from 'supertest';
import { Sequelize } from 'sequelize-typescript';
import app from '../src/app'; // see note below about exporting app
import { Product } from '../src/models'; // adjust path if needed

describe('Products API', () => {
  beforeAll(async () => {
    // Optionally use a test DB or in-memory DB; here we assume the same DB but you can adapt
    // Ensure DB is ready and models are synced for tests
    await Product.sync({ force: true });
    await Product.create({
      name: 'Toothbrush',
      description: 'Soft bristles',
      price: 2.99,
      stock: 100,
    });
  });

  afterAll(async () => {
    // Close DB connections if needed
    const sequelize = (Product as any).sequelize as Sequelize | undefined;
    if (sequelize) await sequelize.close();
  });

  it('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it('GET /products returns array', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0]).toHaveProperty('name');
  });

  it('POST /products creates product', async () => {
    const payload = { name: 'Soap', description: 'Bar soap', price: 1.5, stock: 20 };
    const res = await request(app).post('/products').send(payload).set('Accept', 'application/json');
    expect([200, 201]).toContain(res.status);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe(payload.name);
  });
});
