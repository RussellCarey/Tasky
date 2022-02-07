import { ICommandInitalObject } from "../../../types/types";
import {
  getUserInformation,
  changeUserPassword,
  changeUserEmail,
  deleteUserAccount,
} from "../services/dbAccountServices";
import { errorMessage } from "./utilCommandServices";

export const showUserInformation = async (commandObject: ICommandInitalObject) => {
  try {
    const args = commandObject.args;
    if (args.length > 1) return ["Too many arguments for this command."];

    const userInformation = await getUserInformation();
    if (userInformation.data.status !== "success") return ["Error getting your information. Please try again."];

    const userData = userInformation.data.data;

    return [
      "Your information: ",
      `Username: ${userData.username}`,
      `Email: ${userData.email}`,
      `Status: ${userData.ismember ? "Premium member!" : "Free. Fancy upgrading to get more benefits?"}`,
    ];
  } catch (error: any) {
    return errorMessage(error);
  }
};

export const changePassword = async (commandObject: ICommandInitalObject) => {
  try {
    const args = commandObject.args;

    if (args.length > 3) return ["Too many arguments for this command."];
    if (args.length < 3) return ["Too few arguments for this command."];

    const currentPassword = args[0];
    const newPasssword = args[1];
    const confirmNewPassword = args[2];

    const changeAttempt = await changeUserPassword(currentPassword, newPasssword, confirmNewPassword);
    if (changeAttempt.data.status !== "success") return ["Error changing password. Please try again."];

    return ["Your password has been changed. You have been logged out. Please login again."];
  } catch (error: any) {
    return errorMessage(error);
  }
};

export const changeEmail = async (commandObject: ICommandInitalObject) => {
  try {
    const args = commandObject.args;

    if (args.length > 3) return ["Too many arguments for this command."];
    if (args.length < 3) return ["Too few arguments for this command."];

    const currentEmail = args[0];
    const newEmail = args[1];
    const confirmNewEmail = args[2];

    const changeAttempt = await changeUserEmail(currentEmail, newEmail, confirmNewEmail);
    if (changeAttempt.data.status !== "success") return ["Error changing email. Please try again."];

    return [`Your email has been changed to ${newEmail}. You have been logged out. Please login again.`];
  } catch (error: any) {
    return errorMessage(error);
  }
};

export const deleteAccount = async (commandObject: ICommandInitalObject) => {
  try {
    const args = commandObject.args;

    if (args.length > 2) return ["Too many arguments for this command. Please enter your password and confirmation."];
    if (args.length < 2) return ["Too few arguments for this command. Please enter your password and confirmation."];

    const password = args[0];
    const passwordConfirm = args[1];

    const changeAttempt = await deleteUserAccount(password, passwordConfirm);
    if (changeAttempt.data.status !== "success") return ["Error removing your account. Please try again."];

    return [`Your account has been deleted. Sorry to see you go! You have been logged out.`];
  } catch (error: any) {
    return errorMessage(error);
  }
};

export const upgradeAccount = (commandObject: ICommandInitalObject) => {
  if (commandObject.args.length > 0) return ["Please type again without arguments."];
  return ["upgrade account"];
};
