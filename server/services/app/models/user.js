"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Category, {
        through: models.Post,
        foreignKey: "authorId",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email already used",
        },
        validate: {
          notNull: { msg: "Email is required" },
          notEmpty: { msg: "Email is required" },
          isEmail: { msg: "Invalid email format" },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: "Password is required" },
          notEmpty: { msg: "Password is required" },
        },
      },
      role: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
