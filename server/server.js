require("dotenv").config();
const app = require("./config/app");
const httpServer = require("http").createServer(app);
const { UserStore } = require("./UserStore");

const PORT_SERVER = process.env.PORT_SERVER;
const CLIENT_URL = process.env.CLIENT_URL;

const userStore = new UserStore();
// socket config.
const io = require("socket.io")(httpServer, {
  cors: {
    origin: CLIENT_URL,
  },
});

io.on("connection", (socket) => {
  socket.on("user-connected", (user) => {
    console.log(`${user.username} has been connected.`);
    userStore.saveUser(user._id, user.username, socket.id);
    socket.join(user._id);
    io.emit("getUsers", userStore.getAllUser());
  });

  socket.on("send-message", ({ fromId, toId, text }) => {
    const toUser = userStore.getUserById(toId);
    const fromUser = userStore.getUserById(fromId);
    console.log(fromId, toId);
    socket.to(fromId).to(toId).emit("get-message", { text, fromUser, toUser });
  });
  socket.on("disconnect", () => {
    console.log(`A user has been left.`);
    userStore.removeUser(socket.id);
    console.log(userStore.getAllUser().length);
    io.emit("getUsers", userStore.getAllUser());
  });
});

// server config
httpServer.listen(PORT_SERVER, (err) => {
  if (err) {
    process.exit(1);
  }
  console.log(`HttpServer running on port ${PORT_SERVER}`);
});

module.exports = { httpServer };
