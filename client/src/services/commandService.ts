import Cookies from "js-cookie";
import { helpScreenText, aboutText } from "../constants/text";
import { ECommandReturnOptions } from "../types/commandReturnEnums";

import {
  logoutAttempt,
  loginAttempt,
  signupAttempt,
  addNewTaskNameAttempt,
  getTaskNames,
  addNewTaskHours,
  deleteTaskName,
  deleteTaskWithHours,
  getTasksOnDate,
  getTasksFromDateRange,
  deleteTasksDate,
  deleteTasksFromDateRange,
} from "./dbServices";
import { checkValidEmail, checkValidPassword, checkValidUsername } from "../utils/inputValidation";

// UTILITIES
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

// LOGIN LOGOUT SIGNUP.
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

// TASK NAMES (NOT ACTUAL SAVED TASK WITH HOURS)
export const addNewTaskName = async (args: Array<string>) => {
  try {
    // signup username email password passwordconfirm
    const nameString: string = args.join(" ");

    // Add the new task name..
    const newTaskNameRequest = await addNewTaskNameAttempt(nameString);

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

export const deleteTaskNames = async (args: Array<string>) => {
  try {
    const id = Number(args[0]);

    const deletedTaskName = await deleteTaskName(id);
    console.log(deletedTaskName);

    return ["Attempting to delete task name..", "Your task name was deleted. "];
  } catch (error) {
    return ["Attempting to delete task name..", "Error deleteing task name, please try again."];
  }
};

// USERS SAVED TASK WITH HOURS
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

export const deleteTask = async (args: Array<string>) => {
  try {
    const taskID = Number(args[0]);

    const deleteTaskAndData = await deleteTaskWithHours(taskID);
    console.log(deleteTaskAndData);

    return ["Attempting to delete task..", "Task was deleted!"];
  } catch (error: any) {
    const err = error.response;
    if (!err.data.message) return ["Attempting to delete task!", `Unknown error, please try again`];
    return ["Attempting to delete task!", `Adding task failed. ${err.data.message}`];
  }
};

// export const showTasksForToday = async (args: Array<string>) => {
//   try {
//     if (args.length > 0) return ["Too many argumentssssss from show tasks today"];

//     const daysTasks = await getTasksOnDate(null);
//     if (daysTasks.data.data.rows.length === 0) return ["Sorry, you have no tasks saved for this date"];

//     return ["Got todays tasks.."];
//   } catch (error: any) {
//     console.log(error.response.message);
//     return ["Error getting your days tasks, please try again."];
//   }
// };

export const showTasksOnDate = async (args: Array<string>) => {
  try {
    if (args.length > 1) return ["Too many argumentssssss fro show tasks on date"];
    const date = args[0];

    const daysTasks = await getTasksOnDate(date);
    if (daysTasks.data.data.rows.length === 0) return ["Sorry, you have no tasks saved for this date"];

    return ["Got the days tasks.."];
  } catch (error: any) {
    console.log(error.response.message);
    return ["Error getting your days tasks, please try again."];
  }
};

export const showTasksDateRange = async (args: Array<string>) => {
  try {
    if (args.length > 2) return ["Too many argumentssssss from show task date range"];
    const dateStart = args[0];
    const dateEnd = args[1];

    const daysTasks = await getTasksFromDateRange(dateStart, dateEnd);
    if (daysTasks.data.data.rows.length === 0) return ["Sorry, you have no tasks saved for this date range"];

    return ["Got the dates range tasks.."];
  } catch (error: any) {
    console.log(error.response.message);
    return ["Error getting your tasks, please try again."];
  }
};

export const deleteTasksFromRange = async (args: Array<string>) => {
  console.log("jdsbfjsdubfd");
  try {
    if (args.length > 2) return ["Too many argumentssssss from DELETE ASK DAET RANGE"];
    const dateStart = args[0];
    const dateEnd = args[1];

    const daysTasks = await deleteTasksFromDateRange(dateStart, dateEnd);
    if (daysTasks.data.data.rows.length === 0) return ["Deleted Tasks"];

    return ["Error deleteing tasks, please try again."];
  } catch (error: any) {
    console.log(error.response.message);
    return ["Error getting your tasks, please try again."];
  }
};

export const deleteTasksOnDate = async (args: Array<string>) => {
  try {
    if (args.length > 1) return ["Too many argumentssssss fro DELETE tasks on date!!!"];
    const date = args[0];

    const daysTasks = await deleteTasksDate(date);
    if (daysTasks.data.data.rows.length === 0) return ["Deleted tasks."];

    return ["Error deleteing tasks, please try again."];
  } catch (error: any) {
    console.log(error.response.message);
    return ["Error getting your tasks, please try again."];
  }
};
