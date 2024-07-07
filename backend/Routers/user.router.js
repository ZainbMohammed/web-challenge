const express = require("express");
const router = express.Router();
const userControllers = require("../Controllers/user.controller");
const authenticateToken = require("../utilities");

// route for get user info
router.route("/get-user-info")
      .get(authenticateToken, userControllers.getUserInfo);

// route for create new user 
router.route("/register")
      .post(userControllers.register);

// route for login exist user
router.route("/login")
      .post(userControllers.login);

module.exports = router;
