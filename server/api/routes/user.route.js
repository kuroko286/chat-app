const express = require("express");
const {
  getUserById,
  getAllUser,
  addFriend,
  getAllFriend,
} = require("../controllers/user.controller");
const { checkFriend } = require("../middlewares/user.middle");
const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getUserById);
router.put("/:fromId/:toId", checkFriend, addFriend);
router.get("/:id/friends", getAllFriend);

module.exports = router;
