import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, CookieOptions } from "express";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
const { promisify } = require("util");

import {
  checkPasswordsMatch,
  checkUserExistsEmail,
  checkUserExistsUsername,
  addUserToTheDB,
  bcryptPassword,
  bcryptComaprePasswords,
  authorizeUser,
  findUserByAuthKey,
} from "../services/authServices";
import { sendWelcomeEmail } from "./emailController";

// Create a JWT, set a cookie and its options and send it back to the client
const createAndSendJWT = async (res: Response, data: any) => {
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

// Sign up, get data, check if the username or email exists. if it does not then create a new account and return data, cookie etc back to the client..
exports.signUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  if (!body) throw new AppError("Failed. Error signing up.", 500);

  // Check passwords are the same..
  const passwordsMatch = await checkPasswordsMatch(body.password, body.passwordConfirm);
  if (!passwordsMatch) throw new AppError("Passwords did not match.", 500);

  // Check for exisiting email
  const checkEmail = await checkUserExistsEmail(body.email);
  if (checkEmail.rows.length > 1) throw new AppError("This email has already been taken.", 500);

  // Check for existing username
  const checkUsername = await checkUserExistsUsername(body.username);
  if (checkUsername.rows.length > 1) throw new AppError("Username has already been taken.", 500);

  // Encrypt password with bcrypt
  const cryptedPassword = await bcryptPassword(req.body.password);
  if (!cryptedPassword) throw new AppError("Failed. Sorry, please try again.", 500);

  // Add to the DB
  const addedUser = await addUserToTheDB(body, cryptedPassword);

  const welcomeEmail = await sendWelcomeEmail(body.username, body.email, addedUser);
  console.log("Returned welcome email");
  console.log(welcomeEmail);

  const removePassword = { ...body, password: "" };

  // Create token
  await createAndSendJWT(res, removePassword);
});

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
  if (!req.headers.cookie) throw new AppError("Sorry. Something went wrong on our end.", 500);

  // Removed the jwt= from the cookie and decode the users data..
  // Get valid string from cookie;
  const cookie = req.headers.cookie?.slice(4) as string;

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
    success: "success",
  });
};

// Authorize user to accss the about from link in their email. They cannot login until they do this..
exports.authorize = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // www.website.com/?user=df82f-23f23f-f23f23f-23f23f
  const uuid = req.body.uuid;
  if (!uuid) return new AppError("URL does not contain valid ID string", 500);

  const foundUser = await findUserByAuthKey(uuid);
  if (!foundUser || foundUser.rows.length === 0) return new AppError("Could not find user with the auth key.", 500);
  if (foundUser.rows[0].active === true) return new AppError("You are already authenticated.", 500);

  const authorize = await authorizeUser(uuid);

  res.json({
    status: "Success",
    date: authorize,
  });
});
