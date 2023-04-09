const app = require("express")();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.get("/", function (req, res) {
  res.send("Home page");
});

io.on("connection", (socket) => {
  console.log("new client has been connected");
  socket.on("send-chat", (message) => {
    console.log("chat happen");
    socket.broadcast.emit("chat", message);
  });
  socket.on("disconnect", (socket) => {
    console.log("Someone has been left");
  });
});

httpServer.listen(8000, () => {
  console.log("HttpServer running on port 8000");
});
