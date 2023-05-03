const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.post("/users/register", UserController.register);
router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.getUser);
router.delete("/users/:id", UserController.deleteUser);

module.exports = router;
