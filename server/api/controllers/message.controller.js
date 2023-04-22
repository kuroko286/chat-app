const {
  findAllMessage,
  createMessage,
} = require("../services/message.service");

const getAllMessage = async (req, res) => {
  const fromId = req.params.fromId;
  const toId = req.params.toId;
  if (!fromId || !toId) {
    return res
      .status(400)
      .send("Bad req when get messages! Require fromId or toId");
  }
  try {
    const dialog = await findAllMessage(fromId, toId);
    res.json(dialog);
  } catch (error) {
    return res.status(400).send("Cannot get messages.");
  }
};

const sendMessage = async (req, res) => {
  const fromId = req.params.fromId;
  const toId = req.params.toId;

  const text = req.body.text;
  if (!fromId || !toId || !text) {
    return res
      .status(400)
      .send("Bad req when send message! Require fromId, toId or message");
  }
  try {
    await createMessage(fromId, toId, text);
    res.status(200).send("Send mess success.");
  } catch (error) {
    return res.status(400).send("Cannot send message.");
  }
};

module.exports = { getAllMessage, sendMessage };
