const express = require("express");
const router = express.Router();
const PostController = require("../controllers/PostController");
const authentication = require("../middleware/authentication");

router.get("/posts", PostController.getAllPosts);
router.get("/posts/:id", PostController.getPost);
router.post("/posts", PostController.createPost);
router.delete("/posts/:id", PostController.deletePost);
router.put("/posts/:id", PostController.updatePost);
router.delete("/posts/author/:id", PostController.deletePostByAuthorId);

module.exports = router;
