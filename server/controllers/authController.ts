import { Response, Request, NextFunction } from "express";
import { IRequestWithUser, ITwitterUserObject, ISessionRequest } from "../types/types";

const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
import isDev from "../utils/isDev";

// On when login is succsesful!!!!!
exports.onTwitterCallback = catchAsync(async (req: IRequestWithUser, res: Response, next: NextFunction) => {
  // Check we were able to get a user through login and save.. :)
  if (!req.user) return next(new AppError("Couldnt verify user", 400));

  // Create user object
  const twitterUserObject: ITwitterUserObject = {
    id: req.user.id,
    username: req.user.username,
    displayName: req.user.displayName,
    email: req.user.emails[0].value,
    profileImage: req.user.photos[0].value,
  };

  const token = await jwt.sign(twitterUserObject, process.env.JWT_SECRET);

  // Set return location depending on production or development.
  const returnLocation = isDev() ? process.env.DEV_URL : process.env.PROD_URL;

  res.set("location", returnLocation);

  // Passport sets a token, this is another..
  res.cookie("token", token, {
    httpOnly: false,
    secure: false,
  });

  res.status(302).json({
    token: token,
  });
});

// Check the req object hasa user.. (logegd in)
exports.checkTwitterIsLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (req.user) {
    next();
  } else {
    return next(new AppError("User not logged in", 302));
  }
};

// Set user in the req..
exports.checkJWTAndSetUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return next(new AppError("No auth token found.", 302));

  const verified = await jwt.verify(token, process.env.JWT_SECRET);
  if (verified.err) return next(new AppError("Failed in verifying token", 111));

  req.user = verified;
  next();
});

exports.getUserData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) return next(new AppError("No auth token found.", 302));
  const verified = await jwt.verify(token, process.env.JWT_SECRET);
  if (verified.err) return next(new AppError("Failed in verifying token", 111));

  res.json({
    data: verified,
  });
});

// Logout of application..
exports.logout = (req: ISessionRequest, res: Response, next: NextFunction) => {
  console.log("loggint out");
  req.session.destroy(function () {
    res.clearCookie("connect.sid");
    res.clearCookie("token");
    res.json({
      status: "success",
    });
  });
};
