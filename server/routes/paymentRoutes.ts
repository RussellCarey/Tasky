import express from "express";
const router = express.Router();

const StripeController = require("../controllers/stripeController");

router.post("/create-intent", StripeController.CreateIntent);

module.exports = router;
