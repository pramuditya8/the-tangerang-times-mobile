const bcrypt = require("bcryptjs");

const hash = (password) => {
  return bcrypt.hashSync(password);
};

const compareHashed = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = { hash, compareHashed };
