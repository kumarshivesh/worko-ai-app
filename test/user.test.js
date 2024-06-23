const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/worko', userRoutes);

describe('User API', () => {
  it('should create a user', async () => {
    const res = await request(app)
      .post('/worko/user')
      .send({
        email: 'test@test.com',
        name: 'Test User',
        age: 25,
        city: 'Test City',
        zipCode: '12345',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  // Add more tests for other endpoints
});
