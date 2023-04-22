const {
  findUserById,
  findAllUser,
  findAllFriend,
  addUserFriend,
} = require("../services/user.sevice");

const home = (req, res) => {
  res.status(200).send("Home page");
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send("Bad req when get user! Require user id.");
  }
  try {
    const user = await findUserById(id);
    res.json(user);
  } catch (error) {
    res.status(404).send("User not found!");
  }
};
const getAllUser = async (req, res) => {
  const users = await findAllUser();
  res.json(users);
};
const getAllFriend = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res
      .status(400)
      .send("Bad req when get user friends! Require user id.");
  }
  try {
    const friends = await findAllFriend(id);
    res.json(friends);
  } catch (error) {
    return res.status(400).send("Wrong when get user friends.");
  }
};
const addFriend = async (req, res) => {
  const fromId = req.params.fromId;
  const toId = req.params.toId;
  if (!fromId || !toId) {
    return res.status(400).send("Bad req when add friend! Require ids.");
  }
  if (fromId === toId) {
    return res.status(300).send("Nothing change.");
  }
  try {
    await addUserFriend(fromId, toId);
    res.status(200).send("Successfully add friend.");
  } catch (error) {
    res.status(400).send("Something wrong when add friend");
  }
};

module.exports = { home, getUserById, getAllUser, getAllFriend, addFriend };
