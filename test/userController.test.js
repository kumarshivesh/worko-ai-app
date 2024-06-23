const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/userRoutes');
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/worko', userRoutes);

jest.mock('../services/userService');

describe('User API', () => {
  let token;

  beforeAll(() => {
    token = 'Bearer ' + jwt.sign({ email: 'test@example.com' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  it('should create a user', async () => {
    userService.createUser.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
    });

    const res = await request(app)
      .post('/worko/user')
      .set('Authorization', token)
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

  it('should list users', async () => {
    userService.getAllUsers.mockResolvedValue([
      {
        id: '1',
        email: 'test@test.com',
        name: 'Test User',
        age: 25,
        city: 'Test City',
        zipCode: '12345',
      },
    ]);

    const res = await request(app)
      .get('/worko/user')
      .set('Authorization', token);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get user details', async () => {
    userService.getUserById.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
    });

    const res = await request(app)
      .get('/worko/user/1')
      .set('Authorization', token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id');
  });

  it('should update a user', async () => {
    userService.updateUser.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      name: 'Updated User',
      age: 26,
      city: 'Test City',
      zipCode: '12345',
    });

    const res = await request(app)
      .put('/worko/user/1')
      .set('Authorization', token)
      .send({
        email: 'test@test.com',
        name: 'Updated User',
        age: 26,
        city: 'Test City',
        zipCode: '12345',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated User');
  });

  it('should patch a user', async () => {
    userService.updateUser.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      name: 'Updated User',
      age: 27,
      city: 'Test City',
      zipCode: '12345',
    });

    const res = await request(app)
      .patch('/worko/user/1')
      .set('Authorization', token)
      .send({
        age: 27,
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('age', 27);
  });

  it('should soft delete a user', async () => {
    userService.softDeleteUser.mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
      isDeleted: true,
    });

    const res = await request(app)
      .delete('/worko/user/1')
      .set('Authorization', token);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('isDeleted', true);
  });

  // Additional tests for error cases and edge cases
  it('should return 400 for invalid user creation data', async () => {
    const res = await request(app)
      .post('/worko/user')
      .set('Authorization', token)
      .send({
        email: 'invalid-email',
        name: 'Test User',
        age: 25,
        city: 'Test City',
        zipCode: '12345',
      });

    expect(res.statusCode).toEqual(400);
  });

  it('should return 404 for non-existent user', async () => {
    userService.getUserById.mockResolvedValue(null);

    const res = await request(app)
      .get('/worko/user/999')
      .set('Authorization', token);

    expect(res.statusCode).toEqual(404);
  });

  it('should return 500 if userService.createUser throws an error', async () => {
    userService.createUser.mockRejectedValue(new Error('Database error'));

    const res = await request(app)
      .post('/worko/user')
      .set('Authorization', token)
      .send({
        email: 'test@test.com',
        name: 'Test User',
        age: 25,
        city: 'Test City',
        zipCode: '12345',
      });

    expect(res.statusCode).toEqual(500);
  });
});
