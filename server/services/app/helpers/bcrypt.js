const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return bcrypt.hashSync(password);
};

const compareHashedPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = { hashPassword, compareHashedPassword };
