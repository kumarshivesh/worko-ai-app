const userDao = require('../daos/userDao');
const UserDto = require('../dtos/userDto');

class UserService {
  async getAllUsers() {
    const users = await userDao.getAllUsers();
    return users.map(user => new UserDto(user));
  }

  async getUserById(userId) {
    const user = await userDao.getUserById(userId);
    if (!user) throw new Error('User not found');
    return new UserDto(user);
  }

  async createUser(user) {
    const newUser = await userDao.createUser(user);
    return new UserDto(newUser);
  }

  async updateUser(userId, user) {
    const updatedUser = await userDao.updateUser(userId, user);
    return new UserDto(updatedUser);
  }

  async softDeleteUser(userId) {
    const deletedUser = await userDao.softDeleteUser(userId);
    return new UserDto(deletedUser);
  }
}

module.exports = new UserService();
