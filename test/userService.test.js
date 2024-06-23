const userService = require('../services/userService');
const userDao = require('../daos/userDao');
const UserDto = require('../dtos/userDto');

jest.mock('../daos/userDao');

describe('User Service', () => {
  it('should get all users', async () => {
    userDao.getAllUsers.mockResolvedValue([
      {
        _id: '1',
        email: 'test@test.com',
        name: 'Test User',
        age: 25,
        city: 'Test City',
        zipCode: '12345',
        isDeleted: false,
      },
    ]);

    const users = await userService.getAllUsers();
    expect(users.length).toBe(1);
    expect(users[0]).toBeInstanceOf(UserDto);
  });

  it('should create a user', async () => {
    userDao.createUser.mockResolvedValue({
      _id: '1',
      email: 'test@test.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
      isDeleted: false,
    });

    const user = await userService.createUser({
      email: 'test@test.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
    });

    expect(user).toBeInstanceOf(UserDto);
  });

  it('should get a user by id', async () => {
    userDao.getUserById.mockResolvedValue({
      _id: '1',
      email: 'test@test.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
      isDeleted: false,
    });

    const user = await userService.getUserById('1');
    expect(user).toBeInstanceOf(UserDto);
  });

  it('should return null for non-existent user', async () => {
    userDao.getUserById.mockResolvedValue(null);

    const user = await userService.getUserById('999');
    expect(user).toBeNull();
  });

  it('should update a user', async () => {
    userDao.updateUser.mockResolvedValue({
      _id: '1',
      email: 'updated@test.com',
      name: 'Updated User',
      age: 26,
      city: 'Updated City',
      zipCode: '54321',
      isDeleted: false,
    });

    const user = await userService.updateUser('1', {
      email: 'updated@test.com',
      name: 'Updated User',
      age: 26,
      city: 'Updated City',
      zipCode: '54321',
    });

    expect(user).toBeInstanceOf(UserDto);
    expect(user.email).toBe('updated@test.com');
  });

  it('should soft delete a user', async () => {
    userDao.softDeleteUser.mockResolvedValue({
      _id: '1',
      email: 'test@test.com',
      name: 'Test User',
      age: 25,
      city: 'Test City',
      zipCode: '12345',
      isDeleted: true, // Make sure isDeleted is included in the mock
    });

    const user = await userService.softDeleteUser('1');
    expect(user).toBeInstanceOf(UserDto);
    expect(user.isDeleted).toBe(true);
  });
});
