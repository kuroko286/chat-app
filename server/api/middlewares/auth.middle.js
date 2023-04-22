const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).send("Access denied!!");
  }
  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    if (err) {
      return res.status(400).send("Invalid token!");
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = { verifyToken };
