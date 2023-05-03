const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const authentication = require("../middleware/authentication");

router.post("/users/login", UserController.adminLogin);
router.post("/users/register", authentication, UserController.adminRegister);

module.exports = router;
