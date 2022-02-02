import express from "express";
const router = express.Router();

const AccountController = require("../controllers/accountController");
const AuthController = require("../controllers/authController");

router.patch("/changeEmail", AuthController.checkLoggedIn, AccountController.changeUserEmail);
router.patch("/changePassword", AuthController.checkLoggedIn, AccountController.changeUserPassword);
router.delete("/deleteAccount", AuthController.checkLoggedIn, AccountController.deleteUserAccount);

module.exports = router;
