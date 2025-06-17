const request = require('supertest');
const express = require('express');
const driversRouter = require('../routes/drivers');

// Create an express app instance for testing
const app = express();
app.use(express.json());
app.use('/drivers', driversRouter);

describe('Drivers API GET endpoints', () => {
  
  // Test GET /drivers (getAll)
  test('GET /drivers should return 200 and a list (array) of drivers', async () => {
    const response = await request(app).get('/drivers');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  // Test GET /drivers/:id with valid ID
  test('GET /drivers/:id with valid id should return 200 and a driver object', async () => {
    // Replace this ID with a valid one from your test DB or mock
    const validId = '68247a1aa4eb84814becfb97';
    
    const response = await request(app).get(`/drivers/${validId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', validId);
  });

  // Test GET /drivers/:id with invalid/non-existent ID
  test('GET /drivers/:id with invalid id should return 404 or appropriate error', async () => {
    const invalidId = 'nonexistentid';
    
    const response = await request(app).get(`/drivers/${invalidId}`);
    expect([404, 400]).toContain(response.statusCode);
  });

  // Test GET /drivers/:id with malformed ID (optional)
  test('GET /drivers/:id with malformed id should return 400', async () => {
    const malformedId = '123';
    
    const response = await request(app).get(`/drivers/${malformedId}`);
    expect(response.statusCode).toBe(400);
  });
});