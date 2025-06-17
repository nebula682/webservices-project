const request = require('supertest');
const express = require('express');
const vehiclesRouter = require('../routes/vehicles');

// Setup express app and use your vehicles router
const app = express();
app.use(express.json());
app.use('/vehicles', vehiclesRouter);

describe('Vehicles API GET endpoints', () => {
  
  test('GET /vehicles should return 200 and an array', async () => {
    const response = await request(app).get('/vehicles');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /vehicles/:id with valid id should return 200 and a vehicle object', async () => {
    // Replace with a valid vehicle ID from your test DB or mock
    const validId = '685029b831d394ba4a17f785';

    const response = await request(app).get(`/vehicles/${validId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', validId);
  });

  test('GET /vehicles/:id with invalid id should return 404 or 400', async () => {
    const invalidId = 'nonexistentid';

    const response = await request(app).get(`/vehicles/${invalidId}`);
    expect([400, 404]).toContain(response.statusCode);
  });

  test('GET /vehicles/:id with malformed id should return 400', async () => {
    const malformedId = '123';

    const response = await request(app).get(`/vehicles/${malformedId}`);
    expect(response.statusCode).toBe(400);
  });
});