const connection = require("../../config/database");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  friends: Array,
});

const User = connection.model("User", userSchema);

module.exports = User;
