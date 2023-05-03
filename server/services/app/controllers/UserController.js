const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { compareHashedPassword } = require("../helpers/bcrypt");

class UserController {
  static async adminLogin(req, res) {
    try {
      const { email, password } = req.body;
      if (!email) {
        res.status(400).json({ message: "Email is required" });
        return;
      }
      if (!password) {
        res.status(400).json({ message: "Password is required" });
        return;
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        res.status(401).json({ message: "Invalid email/password" });
        return;
      }

      const isPasswordCorrect = compareHashedPassword(password, user.password);
      if (!isPasswordCorrect) {
        res.status(401).json({ message: "Invalid email/password" });
        return;
      }

      res.status(200).json({ access_token: signToken({ id: user.id }) });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async adminRegister(req, res) {
    try {
      const { email, username, password, phoneNumber, address } = req.body;

      const user = await User.create({
        email,
        username,
        password,
        role: "admin",
        phoneNumber,
        address,
      });

      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        res.status(400).json({ message: error.errors[0].message });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

module.exports = UserController;
