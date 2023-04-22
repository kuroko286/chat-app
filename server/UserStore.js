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
    const exist = this.users.some((user) => user.userId === userId);
    if (!exist) {
      this.users.push({
        userId,
        username,
        socketId,
      });
    }
  }
  removeUser(socketId) {
    this.users.filter((user) => user.socketId !== socketId);
    return;
  }
}

module.exports = { UserStore };
