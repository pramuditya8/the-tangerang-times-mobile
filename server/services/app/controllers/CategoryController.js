const { Category } = require("../models");

class CategoryController {
  static async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createCategories(req, res) {
    const { name } = req.body;
    try {
      const category = await Category.create({ name });
      res.status(201).json(category);
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

  static async getCategory(req, res) {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        res.status(404).json({ message: "Data not found" });
        return;
      }
      res.status(200).json(category);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateCategory(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        res.status(404).json({ message: "Data not found" });
        return;
      }

      await Category.update({ name }, { where: { id } });

      res.status(200).json({ message: "Category updated successfully" });
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

  static async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        res.status(404).json({ message: "Data not found" });
        return;
      }

      await Category.destroy({ where: { id } });

      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Internal server error" });
    }
  }
}
module.exports = CategoryController;
