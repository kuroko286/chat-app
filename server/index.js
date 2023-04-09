const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { authUser } = require("./utils");

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Home page");
});
app.post("/auth", async (req, res) => {
  const result = await authUser(req.body.username);
  res.send(result);
});

io.on("connection", (socket) => {
  // console.log("new client has been connected");
  socket.on("new-user", (username) => {
    console.log(`${username} has been connected!`);
  });
  socket.on("send-chat", (message, user) => {
    socket.broadcast.emit("chat", message, user);
  });
  socket.on("disconnect", (user) => {
    console.log(`${user} has been left`);
  });
});

httpServer.listen(8000, () => {
  console.log("HttpServer running on port 8000");
});
