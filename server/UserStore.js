class UserStore {
  constructor() {
    this.users = [];
  }
  getAllUser() {
    return this.users;
  }
  getUserById(id) {
    return this.users.find((user) => user.userId === id);
  }
  saveUser(userId, username, socketId) {
    this.users.push({
      userId,
      username,
      socketId,
    });
  }
  removeUser(socketId) {
    this.users = this.users.filter((user) => user.socketId !== socketId);
  }
}

module.exports = { UserStore };
