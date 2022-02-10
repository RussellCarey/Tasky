import Cookie from "js-cookie";
import { logoutAttempt, loginAttempt, signupAttempt } from "../services/dbAuthServices";
import { checkValidEmail, checkValidPassword, checkValidUsername } from "../utils/inputValidation";
import { ICommandInitalObject } from "../../../types/types";
import { errorMessage } from "./utilCommandServices";

// LOGIN LOGOUT SIGNUP....
export const login = async (commandObject: ICommandInitalObject) => {
  const password = commandObject.passwordRef;

  try {
    if (commandObject.args.length !== 2)
      return ["Please type login followed by only the username and password to use this function."];

    const loginRequest = await loginAttempt(commandObject.args[0], password);
    if (loginRequest.data.status !== "success") return ["Error logging in. Please try again."];

    // Set cookie to use
    Cookie.set("jwt", loginRequest.data.data);

    return ["Logged into your account."];
  } catch (error: any) {
    return errorMessage(error);
  }
};

export const logout = async (commandObject: ICommandInitalObject) => {
  try {
    if (commandObject.args.length !== 0) return ["Please type logout with no arguments to use this function."];

    // Logout service.
    const logoutRequest = await logoutAttempt(commandObject.args);
    if (logoutRequest.data.status !== "success") return ["Error logging out. Please try again."];

    Cookie.set("jwt", "");

    return ["Logged out of your account. Have a great day!"];
  } catch (error: any) {
    return [`Failed to logout. Please try again.`];
  }
};

export const signup = async (commandObject: ICommandInitalObject) => {
  try {
    // signup username email password passwordconfirm
    if (commandObject.args.length > 4)
      return ["Please type signup followed by desired username, email, and passwords to use this function."];

    // Run checks on inputs..
    if (!checkValidUsername(commandObject.args[0]))
      return ["Username should contain no numbers, spaces or special characters."];

    if (!checkValidEmail(commandObject.args[1])) return ["Failed. Email was not valid."];

    if (!checkValidPassword(commandObject.args[2], commandObject.args[3]))
      return ["Check passwords match and ensure password is greater than 8 charactrers long."];

    const signupRequest = await signupAttempt(commandObject.args);
    if (signupRequest.data.status !== "success") return ["Error signing up. Please try again."];

    return ["Welcome, you are all signed up. Please check your email for an activation link!"];
  } catch (error: any) {
    return errorMessage(error);
  }
};
