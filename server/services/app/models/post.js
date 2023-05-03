"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Post.belongsTo(models.User, { foreignKey: "authorId" });
      Post.belongsTo(models.Category, { foreignKey: "categoryId" });

      Post.hasMany(models.Tag, { foreignKey: "postId" });
    }
  }
  Post.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notNull: { msg: "Title is required" },
          notEmpty: { msg: "Title is required" },
        },
      },
      slug: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false,
        type: DataTypes.TEXT,
        validate: {
          notNull: { msg: "Content is required" },
          notEmpty: { msg: "Content is required" },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
      },
      categoryId: DataTypes.INTEGER,
      authorId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
