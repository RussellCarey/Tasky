import express from "express";
const router = express.Router();

const AuthController = require("../controllers/authController");

router.post("/signup", AuthController.signUp);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

module.exports = router;
