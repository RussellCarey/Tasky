import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, CookieOptions } from "express";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";
import { ILoginData } from ".././types/types";

import {
  checkPasswordsMatch,
  checkUserExistsEmail,
  checkUserExistsUsername,
  addUserToTheDB,
  bcryptPassword,
  bcryptComaprePasswords,
} from "../services/authServices";
// exports.createNewSurvey = catchAsync(async (req, res, next) => {

// Create function to sing JWTs
const signJWT = async (data: ILoginData) => {
  // data should contain username, email and other things needed on the front end.
  const token = await jwt.sign(data, process.env.JWT_SECRET!);
  return token;
};

// Create a JWT, set a cookie and its options and send it back to the client
const createAndSendJWT = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const token = await signJWT(req.body);
  if (!token) throw new AppError("Failed in signing token", 500);

  const cookieOptions: CookieOptions = {
    expires: new Date(Date.now() + 100000000000),
    secure: true,
    httpOnly: false,
    sameSite: "none",
  };

  res.cookie("jwt", token, cookieOptions);

  res.json({
    success: "success",
    data: token,
  });
});

// Sign up, get data, check if the username or email exists. if it does not then create a new account and return data, cookie etc back to the client..
exports.signUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  if (!body) throw new AppError("No req body found", 500);

  // Check passwords are the same..
  const passwordsMatch = await checkPasswordsMatch(body.password, body.passwordConfirm);
  if (!passwordsMatch) throw new AppError("Passwords did not match.", 500);

  // Check for exisiting email
  const checkEmail = await checkUserExistsEmail(body.email);
  if (checkEmail.rows.length > 1) throw new AppError("Email already taken.", 500);

  // Check for existing username
  const checkUsername = await checkUserExistsUsername(body.username);
  if (checkUsername.rows.length > 1) throw new AppError("Username taken", 500);

  // Encrypt password with bcrypt
  const cryptedPassword = await bcryptPassword(req.body.password);
  if (!cryptedPassword) throw new AppError("Failed to encrypt password", 500);

  // Add to the DB
  const addedUser = await addUserToTheDB(body, cryptedPassword);

  // Create token
  await createAndSendJWT(req, res, next);
});

// login, check email exists and check and decrypt pasword to check if we can login, send back JWT cookie and data.
exports.login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  console.log(body.username);

  // Check email exists
  const getUser = await checkUserExistsUsername(body.username);
  if (getUser.rows.length === 0) throw new AppError("No user found", 500);

  // Use bcrypt to check passwords match
  const checkedPassword = await bcryptComaprePasswords(body.password, getUser.rows[0].password);
  if (!checkedPassword) throw new AppError("Password incorrect", 500);

  // If so, send back the JWT and data
  await createAndSendJWT(req, res, next);
});

// // Check is logged in
exports.checkLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  // Check headers have the JWT cookie inside of it..
  const cookie = req.headers.jwt as string;
  const checkCookie = jwt.decode(cookie);

  if (!checkCookie) throw new AppError("Cannot verify user.", 500);

  next();
};

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
