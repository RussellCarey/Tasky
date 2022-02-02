import { Request, Response, NextFunction, CookieOptions } from "express";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";

import {
  bcryptComaprePasswords,
  checkUserExistsUsername,
  bcryptPassword,
  checkPasswordsMatch,
  checkUserExistsEmail,
  addUserToTheDB,
  checkUserExistsID,
} from "../services/authServices";
import { sendWelcomeEmail } from "./emailController";
import { deleteUser, changeEmail, changePassword } from "../services/acountServices";

// Set expiry to now and remove JWT from cookie to log out user.
const resetCookieOptions: CookieOptions = {
  expires: new Date(Date.now()),
  secure: true,
  httpOnly: false,
  sameSite: "none",
};

// Change the user name of the user.
exports.deleteUserAccount = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body.user;
  const { password, passwordConfirm } = req.body;

  if (!id) throw new AppError("Could not authenticate user. Please try again", 500);
  if (password !== passwordConfirm) throw new AppError("Incorrect password. Please try again", 500);

  // Check database and get user information (Maybe keep this client side?);
  const currentUser = await checkUserExistsID(id);
  if (!currentUser.rows[0]) throw new AppError("Cannot find user or you are not logged in", 500);

  // Compare provided password with current one in the database.
  const encryptedPassword = await bcryptComaprePasswords(password, currentUser.rows[0].password);
  if (!encryptedPassword) throw new AppError("Incorrect current password. Please try agaian", 500);

  const deleteUserAttempt = await deleteUser(id);

  res.cookie("jwt", "", resetCookieOptions);

  res.json({
    status: "success",
    data: deleteUserAttempt,
  });
});

// Change the email of the user
exports.changeUserEmail = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, newEmail, newEmailConfirm } = req.body;

  if (!email || !newEmail || !newEmailConfirm) throw new AppError("Please include all fields.", 500);
  if (newEmail !== newEmailConfirm) throw new AppError("Input the same new email.", 500);

  const currentUser = await checkUserExistsID(req.body.user.id);
  if (!currentUser.rows[0]) throw new AppError("Cannot find user or you are not logged in", 500);

  if (email !== currentUser.rows[0].email) throw new AppError("Please enter your correct current email address", 500);

  const existingEmail = await checkUserExistsEmail(newEmail);
  if (existingEmail.rows[0]) throw new AppError("Email already taken.", 500);

  const changedEmail = await changeEmail(newEmail, req.body.user.id);

  res.cookie("jwt", "", resetCookieOptions);

  res.json({
    status: "success",
    data: changedEmail,
  });
});

// Change the password of the user
exports.changeUserPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { password, newPassword, newPasswordConfirm } = req.body;

  if (!password || !newPassword || !newPasswordConfirm) throw new AppError("Please include all fields.", 500);
  if (newPassword !== newPasswordConfirm) throw new AppError("Input the same new password.", 500);

  // Check database and get user information (Maybe keep this client side?);
  const currentUser = await checkUserExistsID(req.body.user.id);
  if (!currentUser.rows[0]) throw new AppError("Cannot find user or you are not logged in", 500);

  // Compare provided password with current one in the database.
  const encryptedPassword = await bcryptComaprePasswords(password, currentUser.rows[0].password);
  if (!encryptedPassword) throw new AppError("Incorrect current password. Please try agaian", 500);

  // Encrypt new password
  const newUserPassword = await bcryptPassword(newPassword);

  // Save new password into the users DB.
  const changedPassword = await changePassword(newUserPassword, req.body.user.id);

  res.cookie("jwt", "", resetCookieOptions);

  res.json({
    status: "success",
    data: changedPassword,
  });
});

// Sign up, get data, check if the username or email exists. if it does not then create a new account and return data, cookie etc back to the client..
exports.signUp = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  console.log(body);
  if (!body) throw new AppError("Failed. Error signing up.", 500);

  // Check passwords are the same..
  const passwordsMatch = await checkPasswordsMatch(body.password, body.passwordConfirm);
  if (!passwordsMatch) throw new AppError("Passwords did not match.", 500);

  // Check for exisiting email
  const checkEmail = await checkUserExistsEmail(body.email);
  if (checkEmail.rows.length !== 0) throw new AppError("This email has already been taken.", 500);

  // Check for existing username
  const checkUsername = await checkUserExistsUsername(body.username);
  if (checkUsername.rows.length !== 0) throw new AppError("Username has already been taken.", 500);

  // Encrypt password with bcrypt
  const cryptedPassword = await bcryptPassword(req.body.password);
  if (!cryptedPassword) throw new AppError("Failed. Sorry, please try again.", 500);

  // Add to the DB - WE use uuid to give user a code. The chance of a repeating code is so small we dont need to check it exists.
  const addedUser = await addUserToTheDB(body, cryptedPassword);

  // Send welcome email to the user.
  const welcomeEmail = await sendWelcomeEmail(body.username, body.email, addedUser);

  // Create token
  res.json({
    status: "success",
  });
});
