const request = require('supertest');
const express = require('express');
const tripsRouter = require('../routes/trips'); // Make sure this path is correct

// Setup express app and use your trips router
const app = express();
app.use(express.json());
app.use('/trips', tripsRouter);

describe('Trips API GET endpoints', () => {

  test('GET /trips should return 200 and an array', async () => {
    const response = await request(app).get('/trips');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /trips/:id with valid id should return 200 and a trip object', async () => {
    // Replace with a valid trip ID from your test DB or mock
    const validId = '685029b831d394ba4a17f785';

    const response = await request(app).get(`/trips/${validId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', validId);
  });

  test('GET /trips/:id with invalid id should return 404 or 400', async () => {
    const invalidId = 'nonexistentid';

    const response = await request(app).get(`/trips/${invalidId}`);
    expect([400, 404]).toContain(response.statusCode);
  });

  test('GET /trips/:id with malformed id should return 400', async () => {
    const malformedId = '123';

    const response = await request(app).get(`/trips/${malformedId}`);
    expect(response.statusCode).toBe(400);
  });
});