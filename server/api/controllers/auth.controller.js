const jwt = require("jsonwebtoken");

const {
  findUserByUsername,
  findUserByEmail,
} = require("../services/user.sevice");
const { registerValidator } = require("../validates/auth.validate");
const bcrypt = require("bcrypt");
const User = require("../model/user.model");

const register = async (req, res) => {
  const { error } = registerValidator(req.body);
  if (error) {
    return res.status(400).send("Bad request! Invalid input fields");
  }
  const checkUsernameExist = !!(await findUserByUsername(req.body.username));
  const checkEmailExist = !!(await findUserByEmail(req.body.email));
  if (checkUsernameExist || checkEmailExist) {
    return res.status(400).send("Username or email existed!");
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const newUSer = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    await newUSer.save();
    res.send(newUSer);
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);
  if (!user) {
    return res.status(404).send("Wrong username or password");
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (checkPassword) {
    const token = jwt.sign({ id: user._id }, process.env.APP_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token: token, userId: user._id });
  } else {
    return res.status(404).send("Wrong username or password");
  }
};

const authen = async (req, res) => {
  const userId = req.userId;
  res.send({ userId: userId });
};

module.exports = { register, login, authen };
