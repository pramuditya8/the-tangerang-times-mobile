const { Post, User, Category, Tag, sequelize } = require("../models");

class PostController {
  static async getAllPosts(req, res) {
    try {
      const posts = await Post.findAll({
        order: [["createdAt", "DESC"]],
        include: [Category, Tag],
      });
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getPost(req, res) {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id, {
        include: [Category, Tag],
      });
      if (!post) {
        res.status(404).json({ message: "Data not found" });
        return;
      }
      res.status(200).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createPost(req, res) {
    const t = await sequelize.transaction();

    // const { title, content, categoryId, imgUrl, tags } = req.body;
    // const authorId = req.user.id;
    const { title, content, categoryId, authorId, imgUrl, tags } = req.body;
    try {
      if (!title || !content || !categoryId || !authorId || !imgUrl || !tags) {
        res.status(400).json({ message: "All fields is required" });
        t.rollback();
        return;
      }

      const category = await Category.findByPk(categoryId, { transaction: t });
      if (!category) {
        res.status(404).json({ message: "Category not found" });
        t.rollback();
        return;
      }

      const slug = title
        .toLowerCase()
        .replace(/^-+/, "")
        .replace(/-+$/, "")
        .replace(/\s+/g, "-")
        .replace(/\-\-+/g, "-")
        .replace(/[^\w\-]+/g, "");

      const post = await Post.create(
        {
          title,
          slug,
          content,
          categoryId,
          authorId,
          imgUrl,
          tags,
        },
        { transaction: t }
      );

      await Tag.bulkCreate([{ postId: post.id, name: tags }], {
        transaction: t,
      });

      await t.commit();
      res.status(201).json({ message: "Post created successfully" });
    } catch (error) {
      await t.rollback();
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updatePost(req, res) {
    const { id } = req.params;
    const { title, content, categoryId, imgUrl } = req.body;
    try {
      const post = await Post.findByPk(id);
      if (!post) {
        res.status(404).json({ message: "Data not found" });
        return;
      }

      const category = await Category.findByPk(categoryId);
      if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
      }

      const slug = title
        .toLowerCase()
        .replace(/^-+/, "")
        .replace(/-+$/, "")
        .replace(/\s+/g, "-")
        .replace(/\-\-+/g, "-")
        .replace(/[^\w\-]+/g, "");

      await Post.update(
        { title, slug, content, categoryId, imgUrl },
        { where: { id } }
      );

      res.status(200).json({ message: "Post updated successfully" });
    } catch (error) {
      console.log(error);
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

  static async deletePost(req, res) {
    const { id } = req.params;
    try {
      const post = await Post.findByPk(id);
      if (!post) {
        res.status(404).json({ message: "Data not found" });
        return;
      }

      await Post.destroy({ where: { id } });

      res.status(200).json(post);
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deletePostByAuthorId(req, res) {
    const { id } = req.params;
    try {
      const posts = await Post.destroy({ where: { authorId: id } });
      console.log(posts);

      res.status(200).json(posts);
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = PostController;
