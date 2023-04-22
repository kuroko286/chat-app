const User = require("../model/user.model");
const findUserByUsername = async (username) => {
  const user = await User.findOne({ username: username });
  return user;
};
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  return user;
};
const findUserById = async (id) => {
  try {
    const user = await User.findOne({ _id: id });
    return user;
  } catch (error) {
    throw error;
  }
};
const findAllUser = async () => {
  return await User.find({});
};

const addUserFriend = async (fromId, toId) => {
  try {
    const fromUser = await findUserById(fromId);
    const toUser = await findUserById(toId);
    await User.updateOne(
      { _id: fromId },
      { $push: { friends: { id: toId, username: toUser.username } } }
    );
    await User.updateOne(
      { _id: toId },
      { $push: { friends: { id: fromId, username: fromUser.username } } }
    );
  } catch (err) {
    throw err;
  }
};
const findAllFriend = async (id) => {
  try {
    const user = await findUserById(id);
    return user.friends;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findUserByUsername,
  findUserByEmail,
  findUserById,
  findAllUser,
  addUserFriend,
  findAllFriend,
};
