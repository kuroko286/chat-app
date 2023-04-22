const { findAllFriend } = require("../services/user.sevice");

const checkFriend = async (req, res, next) => {
  const fromId = req.params.fromId;
  const toId = req.params.toId;
  const friends = await findAllFriend(fromId);
  let isFriend = friends.map((f) => f.id).includes(toId);
  if (isFriend) {
    return res.send("They have been friend. Nothing change.");
  }
  next();
};

module.exports = { checkFriend };
