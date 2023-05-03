const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const authentication = require("../middleware/authentication");

router.get("/categories", CategoryController.getAllCategories);
router.get("/categories/:id", CategoryController.getCategory);
router.post("/categories", CategoryController.createCategories);
router.put("/categories/:id", CategoryController.updateCategory);
router.delete("/categories/:id", CategoryController.deleteCategory);

module.exports = router;
