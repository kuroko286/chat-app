const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("../api/routes/auth.route");
const userRouter = require("../api/routes/user.route");
const messageRouter = require("../api/routes/message.route");
const cookieParser = require("cookie-parser");
const CLIENT_URL = process.env.CLIENT_URL;

// middlewares
app.use(
  cors({
    origin: CLIENT_URL,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routers
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/messages", messageRouter);
app.use("*", (req, res) => {
  res.status(404).send("Request not found!");
});

module.exports = app;
