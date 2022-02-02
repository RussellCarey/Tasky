import { helpScreenText, aboutText } from "../../../constants/text";
import Cookie from "js-cookie";
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
import { checkValidEmail, checkValidPassword, checkValidUsername } from "../../../utils/inputValidation";

import { ICommandInitalObject } from "../../../types/types";

// UTILITIES
export const showCommandNotFound = (commandObject: ICommandInitalObject) => {
  const joinedStrings = commandObject.args.join(" ");
  return [`Did not recognise command ${joinedStrings}.`];
};

//
export const showHelpText = (commandObject: ICommandInitalObject) => {
  if (commandObject.args.length > 0) return ["Please type show help without arguments to use this function."];
  return helpScreenText;
};

//
export const showAboutText = (commandObject: ICommandInitalObject) => {
  if (commandObject.args.length > 0) return ["Please type show about without arguments to use this function."];
  return aboutText;
};

//
export const clearWindowText = (commandObject: ICommandInitalObject) => {
  if (commandObject.args.length > 0) return ["Please type clear without arguments to use this function."];
  return "clear";
};

const errorMessage = (error: any) => {
  const err = error.response;
  if (err.data.message) return [`Error. ${err.data.message}`];
  return ["Unknown Error, please try again."];
};

interface ITaskObject {
  hours: number;
  id: number;
  taskname: string;
  userid: string;
}

const calculatePercentages = (itemsArray: Array<ITaskObject>) => {
  const totalHours = itemsArray.map((tasks) => +tasks.hours).reduce((pre, curr) => pre + curr);
  const tasksAndHours: any = {};

  itemsArray.forEach((tasks) => {
    const obj = tasksAndHours[tasks.taskname];

    if (!obj)
      return (tasksAndHours[tasks.taskname] = {
        id: tasks.id,
        taskname: tasks.taskname,
        hours: +tasks.hours,
        percentage: (tasks.hours / totalHours) * 100,
      });

    if (obj)
      return (tasksAndHours[tasks.taskname] = {
        ...obj,
        hours: (obj.hours += +tasks.hours),
        percentage: (+obj.hours / totalHours) * 100,
      });
  });

  return tasksAndHours;
};

// LOGIN LOGOUT SIGNUP.
export const login = async (commandObject: ICommandInitalObject) => {
  const password = commandObject.passwordRef;

  try {
    if (commandObject.args.length !== 2)
      return ["Please type login followed by only the username and password to use this function."];

    const loginRequest = await loginAttempt(commandObject.args[0], password);
    if (loginRequest.data.status !== "success") return ["Error logging in. Please try again."];

    // Set cookie to use
    Cookie.set("jwt", loginRequest.data.data);

    return ["Logged into your account"];
  } catch (error: any) {
    return errorMessage(error);
  }
};

//
export const logout = async (commandObject: ICommandInitalObject) => {
  try {
    if (commandObject.args.length !== 0) return ["Please type logout only to use this function."];

    // Logout service.
    const logoutRequest = await logoutAttempt(commandObject.args);
    if (logoutRequest.data.status !== "success") throw new Error();

    return ["Logged out of your account. Have a great day!"];
  } catch (error: any) {
    return [`Failed to logout. Please try again.`];
  }
};

export const signup = async (commandObject: ICommandInitalObject) => {
  try {
    // signup username email password passwordconfirm
    if (commandObject.args.length > 4)
      return ["Please type sign up followed by desired username, email, and passwords to use this function."];

    // Run checks on inputs..
    if (!checkValidUsername(commandObject.args[0]))
      return ["Username should contain no numbers, spaces or special characters."];

    if (!checkValidEmail(commandObject.args[1])) return ["Failed. Email was not valid."];

    if (!checkValidPassword(commandObject.args[2], commandObject.args[3]))
      return ["Check passwords match and ensure password is greater than 8 charactrers long."];

    const signupRequest = await signupAttempt(commandObject.args);

    return ["Welcome, you are all signed up. Please check your email for an activation link!"];
  } catch (error: any) {
    return errorMessage(error);
  }
};

// TASK NAMES (NOT ACTUAL SAVED TASK WITH HOURS)
export const addNewTaskName = async (commandObject: ICommandInitalObject) => {
  try {
    // signup username email password passwordconfirm
    const nameString: string = commandObject.args.join(" ");

    // Add the new task name..
    const newTaskNameRequest = await addNewTaskNameAttempt(nameString);

    return ["Task name was added!"];
  } catch (error: any) {
    return errorMessage(error);
  }
};

export const getAllTaskNames = async () => {
  try {
    // Get all users saves task names
    const taskNamesList = await getTaskNames();
    console.log(taskNamesList);

    // Return the task name along with its ID which the user needs to input.
    const tasksSentences = taskNamesList.data.data.rows.map((task: any, ind: any) => {
      return `[${task.id}] ${task.taskname}`;
    });

    // If the user has no presaved tasks.
    if (tasksSentences.length === 0) return ["You have no saved task names. Add some using `add new task name (name)`"];

    // Return found tasks
    return ["Retrieved tasks:", ...tasksSentences];
  } catch (error: any) {
    return errorMessage(error);
  }
};

export const deleteTaskNames = async (commandObject: ICommandInitalObject) => {
  try {
    const id = Number(commandObject.args[0]);

    const deletedTaskName = await deleteTaskName(id);
    console.log(deletedTaskName);

    return ["Your task name was deleted. "];
  } catch (error: any) {
    return errorMessage(error);
  }
};

// USERS SAVED TASK WITH HOURS
export const addNewTask = async (commandObject: ICommandInitalObject) => {
  try {
    const taskID = Number(commandObject.args[1]);
    const taskHours = Number(commandObject.args[0]);

    // Save users task and the hours spent doing it.
    const newTask = await addNewTaskHours(taskID, taskHours);
    console.log(newTask);

    return ["Task was added!"];
  } catch (error: any) {
    return errorMessage(error);
  }
};

export const deleteTask = async (commandObject: ICommandInitalObject) => {
  try {
    const taskID = Number(commandObject.args[0]);

    const deleteTaskAndData = await deleteTaskWithHours(taskID);
    console.log(deleteTaskAndData);

    return ["Task was deleted!"];
  } catch (error: any) {
    return errorMessage(error);
  }
};

export const showTasksOnDate = async (commandObject: ICommandInitalObject) => {
  try {
    if (commandObject.args.length > 1) return ["Too many arguments provided"];
    const date = commandObject.args[0];

    // Get single days tasks..
    const daysTasks = await getTasksOnDate(date);
    if (daysTasks.data.data.rows.length === 0) return ["Sorry, you have no tasks saved for this date."];

    // Convert the data into an object where each task is collected. Data is task name, hours, percetage.
    const percetangesAndCollection = calculatePercentages(daysTasks.data.data.rows);

    // Convert above object into an array. Return string with data to return to console.
    const stringArrayResults: Array<string> = Object.entries(percetangesAndCollection).map((data: any) => {
      return `[${data[1].id}] ${data[1].taskname} for ${data[1].hours} hours. [${data[1].percentage}%]`;
    });

    // Push date into the start of the array.
    const dateString = commandObject.args[0]
      ? `${commandObject.args[0]}'s tasks, time and time percentages..`
      : "Todays tasks, time and time percentages.";
    stringArrayResults.unshift(dateString);

    return stringArrayResults;
  } catch (error: any) {
    return errorMessage(error);
  }
};

export const showTasksDateRange = async (commandObject: ICommandInitalObject) => {
  try {
    if (commandObject.args.length > 2) return ["Too many argumentssssss from show task date range."];
    const dateStart = commandObject.args[0];
    const dateEnd = commandObject.args[1];

    const daysTasks = await getTasksFromDateRange(dateStart, dateEnd);
    if (daysTasks.data.data.rows.length === 0) return ["Sorry, you have no tasks saved for this date range."];

    // Convert the data into an object where each task is collected. Data is task name, hours, percetage.
    const percetangesAndCollection = calculatePercentages(daysTasks.data.data.rows);
    console.log(percetangesAndCollection);

    // Convert above object into an array. Return string with data to return to console.
    const stringArrayResults: Array<string> = Object.entries(percetangesAndCollection).map((data: any) => {
      console.log(data);
      return `${data[1].taskname} for ${data[1].hours} hours. [${data[1].percentage}%]`;
    });

    // Push date into the start of the array.
    const dateString = commandObject.args[0]
      ? `${commandObject.args[0]} to ${commandObject.args[1]} tasks, time and time percentages..`
      : "Time and time percentages.";
    stringArrayResults.unshift(dateString);

    return stringArrayResults;
  } catch (error: any) {
    return errorMessage(error);
  }
};

export const deleteTasksFromRange = async (commandObject: ICommandInitalObject) => {
  try {
    if (commandObject.args.length > 2) return ["Too many arguments for this command."];
    const dateStart = commandObject.args[0];
    const dateEnd = commandObject.args[1];

    const daysTasks = await deleteTasksFromDateRange(dateStart, dateEnd);
    if (daysTasks.data.data.rows.length === 0) return ["Deleted Tasks"];

    return ["Error deleteing tasks, please try again."];
  } catch (error: any) {
    return errorMessage(error);
  }
};

export const deleteTasksOnDate = async (commandObject: ICommandInitalObject) => {
  try {
    if (commandObject.args.length > 1) return ["Too many arguments for this command."];
    const date = commandObject.args[0];

    const daysTasks = await deleteTasksDate(date);
    if (daysTasks.data.data.rows.length === 0) return ["Deleted tasks."];

    return ["Error deleteing tasks, please try again."];
  } catch (error: any) {
    return errorMessage(error);
  }
};
