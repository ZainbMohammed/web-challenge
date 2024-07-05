const express = require("express");
const router = express.Router();
const userControllers = require("../Controllers/user.controller");
const authenticateToken = require("../utilities");

router.route("/get-user")
      .get(authenticateToken, userControllers.getUser);

router.route("/register")
      .post(userControllers.register);

router.route("/login")
      .post(userControllers.login);

      module.exports = router;
