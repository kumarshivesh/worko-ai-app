const mongoose = require('mongoose');
const User = require('../models/userModel');
const userDao = require('../daos/userDao');

describe('User DAO', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/worko_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  it('should create a user', async () => {
    const user = {
      email: 'test@test.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
    };
    const createdUser = await userDao.createUser(user);
    expect(createdUser).toHaveProperty('_id');
    expect(createdUser.email).toBe('test@test.com');
  });

  it('should get all users', async () => {
    const user1 = new User({
      email: 'test1@test.com',
      name: 'Test User 1',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
    });
    const user2 = new User({
      email: 'test2@test.com',
      name: 'Test User 2',
      age: 30,
      city: 'Test City',
      zipCode: '12345',
    });
    await user1.save();
    await user2.save();

    const users = await userDao.getAllUsers();
    expect(users.length).toBe(2);
  });

  it('should get a user by id', async () => {
    const user = new User({
      email: 'test@test.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
    });
    await user.save();

    const foundUser = await userDao.getUserById(user._id);
    expect(foundUser).toHaveProperty('_id');
    expect(foundUser.email).toBe('test@test.com');
  });

  it('should update a user', async () => {
    const user = new User({
      email: 'test@test.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
    });
    await user.save();

    const updatedUser = await userDao.updateUser(user._id, { name: 'Updated User' });
    expect(updatedUser).toHaveProperty('_id');
    expect(updatedUser.name).toBe('Updated User');
  });

  it('should soft delete a user', async () => {
    const user = new User({
      email: 'test@test.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
    });
    await user.save();

    const deletedUser = await userDao.softDeleteUser(user._id);
    expect(deletedUser).toHaveProperty('_id');
    expect(deletedUser.isDeleted).toBe(true);
  });
});
