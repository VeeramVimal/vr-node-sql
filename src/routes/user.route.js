const express = require("express");
const {UserController} = require("../controller");
const router = express.Router();
router.route('/register').post(UserController.CreateUser);
module.exports = router;