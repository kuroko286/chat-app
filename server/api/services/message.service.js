const Message = require("../model/message.model");
const User = require("../model/user.model");

const findAllMessage = async (fromId, toId) => {
  try {
    return await Message.find({
      $or: [
        { from: fromId, to: toId },
        { from: toId, to: fromId },
      ],
    }).sort("createAt");
  } catch (error) {
    throw error;
  }
};
const createMessage = async (fromId, toId, text) => {
  try {
    const fromUser = await User.findOne({ _id: fromId });
    const mess = new Message({
      text: text,
      from: fromId,
      to: toId,
      fromUsername: fromUser.username,
    });
    await mess.save();
  } catch (error) {
    throw error;
  }
};

module.exports = { findAllMessage, createMessage };
