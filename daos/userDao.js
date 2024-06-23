const User = require('../models/userModel');

class UserDao {
  async getAllUsers() {
    return User.find({ isDeleted: false });
  }

  async getUserById(userId) {
    return User.findOne({ _id: userId, isDeleted: false });
  }

  async createUser(user) {
    const newUser = new User(user);
    return newUser.save();
  }

  async updateUser(userId, user) {
    return User.findByIdAndUpdate(userId, user, { new: true });
  }

  async softDeleteUser(userId) {
    return User.findByIdAndUpdate(userId, { isDeleted: true }, { new: true });
  }
}

module.exports = new UserDao();
