import express from "express";
const router = express.Router();

const AccountController = require("../controllers/accountController");

router.post("/change-email", AccountController.changeUserEmail);
router.post("/change-password", AccountController.changeUserPassword);
router.post("/change-username", AccountController.changeUserUsername);
router.post("/upgrade", AccountController.changeUserUsername);

module.exports = router;
