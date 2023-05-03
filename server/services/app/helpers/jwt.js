const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

function signToken(value) {
  return jwt.sign(value, JWT_KEY);
}

function verifyToken(value) {
  return jwt.verify(value, JWT_KEY);
}

module.exports = { signToken, verifyToken };
