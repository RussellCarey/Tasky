import Cookies from "js-cookie";
import { helpScreenText, aboutText } from "../constants/text";
import { ECommandReturnOptions } from "../types/commandReturnEnums";

import {
  logoutAttempt,
  loginAttempt,
  signupAttempt,
  addNewTaskAttempt,
  getTaskNames,
  addNewTaskHours,
} from "./dbServices";
import { checkValidEmail, checkValidPassword, checkValidUsername } from "../utils/inputValidation";

//
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
export const showAboutText = (args: Array<string>) => {
  if (args.length > 0) return ["Please type show help without arguments to use this function."];
  return aboutText;
};

//
export const clearWindowText = (args: Array<string>) => {
  if (args.length > 0) return ["Please type clear without arguments to use this function."];
  return ECommandReturnOptions.clear;
};

//
export const login = async (args: Array<string>) => {
  try {
    if (args.length !== 2) return ["Please type login with followed by only the username and password"];

    const loginRequest = await loginAttempt(args[0], args[1]);
    if (loginRequest.data.status !== "success") return ["Attempting login, please wait..."];

    return ["Attempting login, please wait...", "Logged into your account. Welcome back!"];
  } catch (error: any) {
    const err = error.response;
    if (!err.data.message) return ["Attempting login, please wait...", `Unknown error, please try again`];
    return ["Attempting login, please wait...", `Failed. ${err.data.message}`];
  }
};

//
export const logout = async (args: Array<string>) => {
  try {
    if (args.length !== 0) return ["Please type logout only."];

    const cookie = Cookies.get("jwt");
    if (!cookie) return ["You are not logged in."];

    // Logout service.
    const logoutRequest = await logoutAttempt(args);
    if (logoutRequest.data.status !== "success") return ["Attempting logout, please wait..."];

    return ["Attempting logout, please wait...", "Logged out of your account. Have a great day"];
  } catch (error: any) {
    return ["Attempting logout, please wait...", `Failed to logout. Please try again.`];
  }
};

export const signup = async (args: Array<string>) => {
  try {
    // signup username email password passwordconfirm
    if (args.length > 4) return ["Please only type the information needed to sign up."];

    // Run checks on inputs..
    if (!checkValidUsername(args[0])) return ["Username should contain no numbers, spaces or special characters."];
    if (!checkValidEmail(args[1])) return ["Not a valid email."];
    if (!checkValidPassword(args[2], args[3]))
      return ["Check passwords match or ensure password is greater than 8 charactrers long."];

    const signupRequest = await signupAttempt(args);
    console.log(signupRequest);

    return ["Attempting sign up, please wait...", "Welcome, you are all signed up. Please login to continue!"];
  } catch (error: any) {
    const err = error.response;
    if (!err.data.message) return ["Attempting login, please wait...", `Login error. Please try again`];
    return ["Attempting signup, please wait...", `Sign up failed. ${err.data.message}`];
  }
};

export const addNewTaskName = async (args: Array<string>) => {
  try {
    // signup username email password passwordconfirm
    const nameString: string = args.join(" ");

    // Add the new task name..
    const newTaskNameRequest = await addNewTaskAttempt(nameString);

    return ["Attempting to add your new task!", "Task was added!"];
  } catch (error: any) {
    const err = error.response;
    if (!err.data.message) return ["Attempting to add your new task!", `Unknown error, please try again`];
    return ["Attempting to add your new task!", `Adding task failed. ${err.data.message}`];
  }
};

export const getAllTaskNames = async () => {
  try {
    // Get all users saves task names
    const taskNamesList = await getTaskNames();

    // Return the task name along with its ID which the user needs to input.
    const tasksSentences = taskNamesList.data.data.rows.map((task: any, ind: any) => {
      return `[${task.id}] ${task.taskname}`;
    });

    // If the user has no presaved tasks.
    if (tasksSentences.length === 0)
      return ["You have no presaved task names, add some using `add new task name (name)`"];

    // Return found tasks
    return ["Retrieved tasks", ...tasksSentences];
  } catch (error: any) {
    return ["Searching for your tasks, please wait..", "Failed to get tasks, please try again."];
  }
};

export const addNewTask = async (args: Array<string>) => {
  try {
    const taskID = Number(args[1]);
    const taskHours = Number(args[0]);

    // Save users task and the hours spent doing it.
    const newTask = await addNewTaskHours(taskID, taskHours);
    console.log(newTask);

    return ["Attempting to add new task..", "Task was added!"];
  } catch (error: any) {
    const err = error.response;
    if (!err.data.message) return ["Attempting to add your new task!", `Unknown error, please try again`];
    return ["Attempting to add your new task!", `Adding task failed. ${err.data.message}`];
  }
};
