const express = require("express");

const authController = require("../controllers/auth-controllers");

const router = express.Router();

router.get("/signup", authController.getSignUp);

router.get("/login", authController.getLogin);

router.post("/signup", authController.createUser);

router.post("/login", authController.loginUser);

router.post("/logout", authController.logOut);

module.exports = router;
