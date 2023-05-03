const express = require("express");
const router = express.Router();
const users = require("./users");
const posts = require("./posts");
const categories = require("./categories");

router.use("/", users);
router.use("/", posts);
router.use("/", categories);

module.exports = router;
