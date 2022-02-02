import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, CookieOptions } from "express";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
const { promisify } = require("util");

import {
  checkUserExistsUsername,
  bcryptComaprePasswords,
  authorizeUser,
  findUserByAuthKey,
} from "../services/authServices";

// Create a JWT, set a cookie and its options and send it back to the client......
export const createAndSendJWT = async (res: Response, data: any) => {
  // Sign token with data provided
  const token = await jwt.sign(data, process.env.JWT_SECRET!);

  if (!token) throw new AppError("Failed in signing token", 500);

  const cookieOptions: CookieOptions = {
    expires: new Date(Date.now() + 100000000000),
    secure: true,
    httpOnly: false,
    sameSite: "none",
  };

  res.cookie("jwt", token, cookieOptions);

  res.json({
    status: "success",
    data: token,
  });
};

// login, check email exists and check and decrypt pasword to check if we can login, send back JWT cookie and data.
exports.login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  // Check email exists
  const getUser = await checkUserExistsUsername(body.username);
  if (getUser.rows.length === 0) throw new AppError("Username or password is incorrect.", 500);

  const usersConfirmationStatus = getUser.rows[0].active;
  if (!usersConfirmationStatus) throw new AppError("Not authenticated. Please confirm your email address.", 500);

  // Use bcrypt to check passwords match
  const checkedPassword = await bcryptComaprePasswords(body.password, getUser.rows[0].password);
  if (!checkedPassword) throw new AppError("Username or password is incorrect.", 500);

  const removePassword = { ...body, password: "" };

  // If so, send back the JWT and data
  await createAndSendJWT(res, removePassword);
});

exports.checkLoggedIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.jwt) throw new AppError("Sorry. Cookie error. Something went wrong on our end.", 500);

  const cookie = req.cookies.jwt;

  // Verify and decode the token and check for errors
  const checkCookie = await promisify(jwt.verify)(cookie, process.env.JWT_SECRET!);
  if (!checkCookie) throw new AppError("User is not logged in.", 500);

  // Get user account data from the DB
  const checkForUser = await checkUserExistsUsername(checkCookie.username);
  if (checkForUser.rows.length < 1) throw new AppError("User is not logged in. ", 500);

  // Add user data to the req object to user..
  req.body.user = checkForUser.rows[0];

  next();
});

// Logout
exports.logout = (req: Request, res: Response, next: NextFunction) => {
  // Overwrite JWT so user cannot log in.
  const cookieOptions: CookieOptions = {
    expires: new Date(Date.now()),
    secure: false,
    httpOnly: false,
    sameSite: false,
  };

  res.cookie("jwt", "", cookieOptions);

  res.json({
    status: "success",
  });
};

// Authorize user to accss the about from link in their email. They cannot login until they do this..
exports.authorize = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // www.website.com/?user=df82f-23f23f-f23f23f-23f23f
  const uuid = req.body.uuid;
  if (!uuid) throw new AppError("URL does not contain valid ID string", 500);

  const foundUser = await findUserByAuthKey(uuid);
  if (!foundUser || foundUser.rows.length === 0) throw new AppError("Could not find user with the auth key.", 500);
  if (foundUser.rows[0].active === true) throw new AppError("You are already authenticated.", 500);

  const authorize = await authorizeUser(uuid);

  res.json({
    status: "Success",
    date: authorize,
  });
});

exports.getUserData = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.jwt) throw new AppError("Sorry. Cookie error. Something went wrong on our end.", 500);

  const cookie = req.cookies.jwt;

  // Verify and decode the token and check for errors
  const checkCookie = await promisify(jwt.verify)(cookie, process.env.JWT_SECRET!);
  if (!checkCookie) throw new AppError("User is not logged in.", 500);

  // Get user account data from the DB
  const checkForUser = await checkUserExistsUsername(checkCookie.username);
  if (!checkForUser.rows[0]) throw new AppError("User is not logged in. ", 500);

  const userData = checkForUser.rows[0];
  userData.password = "";

  res.json({
    status: "success",
    data: userData,
  });
});
