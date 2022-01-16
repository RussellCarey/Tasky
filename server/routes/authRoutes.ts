const authController = require("../controllers/authController");
const passportRoute = require("passport");
const expressRoute = require("express");
const router = expressRoute.Router();
import { Request, Response } from "express";

// Login attempt to twitter.
router.get("/twitter", passportRoute.authenticate("twitter"));

//prettier-ignore
router.get("/twitter/callback",passportRoute.authenticate("twitter", {failureRedirect: "/twitter/failed",}), authController.onTwitterCallback);

// Failure Redirect..
router.get("/twitter/failed", (req: Request, res: Response) => res.send("FAILED TO LOGIN"));

// Check if logged into twitter..
router.get("/twitter/isloggedin", authController.checkJWTAndSetUser, authController.checkTwitterIsLoggedIn);

router.post("/getUserData", authController.getUserData);

// Logout
router.get("/logout", authController.logout);

module.exports = router;
