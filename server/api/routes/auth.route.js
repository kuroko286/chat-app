const express = require("express");
const { register, login, authen } = require("../controllers/auth.controller");
const { verifyToken } = require("../middlewares/auth.middle");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/", verifyToken, authen);

module.exports = router;
