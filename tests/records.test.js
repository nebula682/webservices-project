const request = require('supertest');
const express = require('express');
const recordsRouter = require('../routes/records');

// Setup express app and use your records router
const app = express();
app.use(express.json());
app.use('/records', recordsRouter);

describe('Records API GET endpoints', () => {
  
  test('GET /records should return 200 and an array', async () => {
    const response = await request(app).get('/records');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /records/:id with valid id should return 200 and a record object', async () => {
    // Replace with a valid record ID from your test DB or mock
    const validId = '68502b0b31d394ba4a17f78c';
    
    const response = await request(app).get(`/records/${validId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', validId);
  });

  test('GET /records/:id with invalid id should return 404 or 400', async () => {
    const invalidId = 'nonexistentid';
    
    const response = await request(app).get(`/records/${invalidId}`);
    expect([400, 404]).toContain(response.statusCode);
  });

  test('GET /records/:id with malformed id should return 400', async () => {
    const malformedId = '123';
    
    const response = await request(app).get(`/records/${malformedId}`);
    expect(response.statusCode).toBe(400);
  });
});