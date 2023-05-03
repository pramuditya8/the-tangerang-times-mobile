const { hash } = require("../helpers/bcrypt");
const User = require("../models/user");
const { ObjectId } = require("mongodb");

class UserController {
  static async register(req, res) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const validEmailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

      if (!email) {
        res.status(400).json({ message: "Email is required" });
        return;
      }

      if (!email.match(validEmailRegex)) {
        res.status(400).json({ message: "Invalid email format" });
        return;
      }

      if (!password) {
        res.status(400).json({ message: "Password is required" });
        return;
      }

      const available = await User.findOne({ email });

      if (available) {
        res.status(400).json({ message: "Email already used" });
        return;
      }

      const user = await User.create({
        username,
        email,
        password: hash(password),
        role: "User",
        phoneNumber,
        address,
      });

      const data = await User.findOne({
        _id: new ObjectId(user.insertedId),
      });

      delete data.password;

      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getUsers(req, res) {
    try {
      const users = await User.findAll();

      const data = users.map((e) => {
        delete e.password;
        return e;
      });

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getUser(req, res) {
    try {
      const { id } = req.params;

      if (id.length < 24) {
        res.status(400).json({ message: "Id must be 24 characters long" });
        return;
      }

      const user = await User.findOne({
        _id: new ObjectId(id),
      });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      delete user.password;
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;

      if (id.length < 24) {
        res.status(400).json({ message: "Id must be 24 characters long" });
        return;
      }

      const user = await User.findOne({
        _id: new ObjectId(id),
      });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      await User.destroy({
        _id: new ObjectId(id),
      });

      delete user.password;

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = UserController;
