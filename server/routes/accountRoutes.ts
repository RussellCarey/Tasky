import express from "express";
const router = express.Router();

const AccountController = require("../controllers/accountController");
const AuthController = require("../controllers/authController");

router.post("/change-email", AuthController.checkLoggedIn, AccountController.changeUserEmail);
router.post("/change-password", AuthController.checkLoggedIn, AccountController.changeUserPassword);
router.post("/change-username", AuthController.checkLoggedIn, AccountController.changeUserUsername);
router.post("/upgrade", AuthController.checkLoggedIn, AccountController.changeUserUsername);

module.exports = router;
