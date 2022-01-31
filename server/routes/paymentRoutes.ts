import express from "express";
const router = express.Router();

const StripeController = require("../controllers/stripeController");
const AuthController = require("../controllers/authController");

router.post("/create-intent", AuthController.checkLoggedIn, StripeController.CreateIntent);
router.post("/stripe-webhook", StripeController.webhook);

module.exports = router;
