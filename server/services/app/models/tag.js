"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tag.belongsTo(models.Post, { foreignKey: "postId" });
    }
  }
  Tag.init(
    {
      postId: {
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: "Name is required" },
          notEmpty: { msg: "Name is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Tag",
    }
  );
  return Tag;
};
