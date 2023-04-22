const connection = require("../../config/database");
const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    text: String,
    from: mongoose.Schema.Types.ObjectId,
    to: mongoose.Schema.Types.ObjectId,
    fromUsername: String,
  },
  { timestamps: true }
);

const Message = connection.model("Message", messageSchema);

module.exports = Message;
