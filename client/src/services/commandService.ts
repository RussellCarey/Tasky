import Cookies from "js-cookie";
import { helpScreenText } from "../constants/text";
import { ECommandReturnOptions } from "../types/commandReturnEnums";

import { logoutAttempt, loginAttempt } from "./dbServices";

export const showCommandNotFound = (args: Array<string>) => {
  const joinedStrings = args.join(" ");
  return [`Did not recognise command ${joinedStrings}.`];
};

//
export const showHelpText = (args: Array<string>) => {
  if (args.length > 0) return ["Please type show help without arguments to use this function."];

  return helpScreenText;
};

//
export const clearWindowText = (args: Array<string>) => {
  if (args.length > 0) return ["Please type clear without arguments to use this function."];
  return ECommandReturnOptions.clear;
};

//
export const login = async (args: Array<string>) => {
  if (args.length !== 2) return ["Please type login with followed by only the username and password"];

  const loginRequest = await loginAttempt(args[0], args[1]);
  console.log(loginRequest);

  return ["Attempting login, please wait...", "Logged into your account.", "Welcome back!"];
};

//
export const logout = async (args: Array<string>) => {
  if (args.length !== 0) return ["Please type logout only."];

  const cookie = Cookies.get("jwt");
  if (!cookie) return ["You are not logged in."];

  // Logout service.
  const logoutRequest = await logoutAttempt(args);

  console.log(logoutRequest);
  return ["Attempting logout, please wait...", "Logged out of your account.", "Have a great day"];
};
