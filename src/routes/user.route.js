const express = require("express");
const {UserController} = require("../controller");
const router = express.Router();

router.route('/register/manual').post(UserController.CreateUserManual);

router.route('/register/start_cron').post(UserController.CreateUser);
router.route('/register/stop_cron').post(UserController.StopUserCron);

router.route('/register/start_interval').post(UserController.CreateUserInterval);
router.route('/register/stop_interval').post(UserController.StopUserInterval);



module.exports = router;