import express from "express";
const router = express.Router();

const AuthController = require("../controllers/authController");
const AccountController = require("../controllers/accountController");

router.post("/signup", AccountController.signUp);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.patch("/authorize", AuthController.authorize);

module.exports = router;
