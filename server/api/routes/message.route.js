const express = require("express");
const {
  getAllMessage,
  sendMessage,
} = require("../controllers/message.controller");
const router = express.Router();

router.get("/:fromId/:toId", getAllMessage);
router.post("/:fromId/:toId", sendMessage);

module.exports = router;
