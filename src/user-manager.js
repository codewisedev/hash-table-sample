const HashTable = require("./hash-table");

class UserManager {
  constructor() {
    this.users = new HashTable();
  }

  validateUserData(userData) {
    if (!userData || typeof userData !== "object") {
      throw new Error("User data must be an object");
    }
    if (!userData.name || typeof userData.name !== "string") {
      throw new Error("User must have a valid name");
    }
  }

  validateEmail(email) {
    if (!email || typeof email !== "string") {
      throw new Error("Email must be a valid string");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
  }

  addUser(email, userData) {
    this.validateEmail(email);
    this.validateUserData(userData);

    if (this.users.get(email)) {
      throw new Error("User already exists");
    }

    this.users.set(email, {
      ...userData,
      createdAt: new Date().toISOString(),
    });
    return true;
  }

  getUser(email) {
    this.validateEmail(email);
    const user = this.users.get(email);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  updateUser(email, newData) {
    this.validateEmail(email);
    if (!newData || typeof newData !== "object") {
      throw new Error("Update data must be an object");
    }

    const existingUser = this.getUser(email);
    this.users.set(email, {
      ...existingUser,
      ...newData,
      updatedAt: new Date().toISOString(),
    });
    return true;
  }

  deleteUser(email) {
    this.validateEmail(email);
    if (!this.users.delete(email)) {
      throw new Error("User not found");
    }
    return true;
  }

  getAllUsers() {
    return this.users.getAll();
  }
}

module.exports = UserManager;
