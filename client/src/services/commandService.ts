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
  if (args.length > 0) return ["Please type show about without arguments to use this function."];
  return aboutText;
};

//
export const clearWindowText = (args: Array<string>) => {
  if (args.length > 0) return ["Please type clear without arguments to use this function."];
  return ECommandReturnOptions.clear;
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
export const login = async (args: Array<string>, password: string) => {
  try {
    if (args.length !== 2)
      return ["Please type login followed by only the username and password to use this function."];

    const loginRequest = await loginAttempt(args[0], password);
    if (loginRequest.data.status !== "success") return ["Error logging in. Please try again."];

    return ["Attempting login, please wait...", "Logged into your account"];
  } catch (error: any) {
    return errorMessage(error);
  }
};

//
export const logout = async (args: Array<string>) => {
  try {
    if (args.length !== 0) return ["Please type logout only to use this function."];

    const cookie = Cookies.get("jwt");
    if (!cookie) return ["You are not logged in."];

    // Logout service.
    const logoutRequest = await logoutAttempt(args);
    if (logoutRequest.data.status !== "success") return ["Attempting logout, please wait..."];

    return ["Attempting logout, please wait...", "Logged out of your account. Have a great day!"];
  } catch (error: any) {
    return ["Attempting logout, please wait...", `Failed to logout. Please try again.`];
  }
};

export const signup = async (args: Array<string>) => {
  try {
    // signup username email password passwordconfirm
    if (args.length > 4)
      return ["Please type sign up followed by desired username, email, and passwords to use this function."];

    // Run checks on inputs..
    if (!checkValidUsername(args[0])) return ["Username should contain no numbers, spaces or special characters."];
    if (!checkValidEmail(args[1])) return ["Failed. Email was not valid."];
    if (!checkValidPassword(args[2], args[3]))
      return ["Check passwords match and ensure password is greater than 8 charactrers long."];

    const signupRequest = await signupAttempt(args);

    return ["Attempting sign up, please wait...", "Welcome, you are all signed up. Please login to continue!"];
  } catch (error: any) {
    return errorMessage(error);
  }
};

// TASK NAMES (NOT ACTUAL SAVED TASK WITH HOURS)
export const addNewTaskName = async (args: Array<string>) => {
  try {
    // signup username email password passwordconfirm
    const nameString: string = args.join(" ");

    // Add the new task name..
    const newTaskNameRequest = await addNewTaskNameAttempt(nameString);

    return ["Attempting to add your new task name!", "Task name was added!"];
  } catch (error: any) {
    return errorMessage(error);
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
      return [
        "Attempting to find for your task names, please wait..",
        "You have no saved task names. Add some using `add new task name (name)`",
      ];

    // Return found tasks
    return ["Attempting to find for your task names, please wait..", "Retrieved tasks:", ...tasksSentences];
  } catch (error: any) {
    return errorMessage(error);
  }
};

export const deleteTaskNames = async (args: Array<string>) => {
  try {
    const id = Number(args[0]);

    const deletedTaskName = await deleteTaskName(id);
    console.log(deletedTaskName);

    return ["Attempting to delete task name..", "Your task name was deleted. "];
  } catch (error: any) {
    return errorMessage(error);
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
    return errorMessage(error);
  }
};

export const deleteTask = async (args: Array<string>) => {
  try {
    const taskID = Number(args[0]);

    const deleteTaskAndData = await deleteTaskWithHours(taskID);
    console.log(deleteTaskAndData);

    return ["Attempting to delete task..", "Task was deleted!"];
  } catch (error: any) {
    return errorMessage(error);
  }
};

export const showTasksOnDate = async (args: Array<string>) => {
  try {
    if (args.length > 1) return ["Too many argumentssssss fro show tasks on date."];
    const date = args[0];

    // Get single days tasks..
    const daysTasks = await getTasksOnDate(date);
    console.log(daysTasks);
    if (daysTasks.data.data.rows.length === 0)
      return ["Attempting to get tasks..", "Sorry, you have no tasks saved for this date."];

    // Convert the data into an object where each task is collected. Data is task name, hours, percetage.
    const percetangesAndCollection = calculatePercentages(daysTasks.data.data.rows);
    console.log(percetangesAndCollection);

    // Convert above object into an array. Return string with data to return to console.
    const stringArrayResults: Array<string> = Object.entries(percetangesAndCollection).map((data: any) => {
      console.log(data);
      return `[${data[1].id}] ${data[1].taskname} for ${data[1].hours} hours. [${data[1].percentage}%]`;
    });

    // Push date into the start of the array.
    const dateString = args[0]
      ? `${args[0]}'s tasks, time and time percentages..`
      : "Todays tasks, time and time percentages.";
    stringArrayResults.unshift(dateString);

    // Push starting sentence.
    stringArrayResults.unshift("Attempting to get tasks..");

    return stringArrayResults;
  } catch (error: any) {
    return errorMessage(error);
  }
};

export const showTasksDateRange = async (args: Array<string>) => {
  try {
    if (args.length > 2) return ["Too many argumentssssss from show task date range."];
    const dateStart = args[0];
    const dateEnd = args[1];

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
    const dateString = args[0]
      ? `${args[0]} to ${args[1]} tasks, time and time percentages..`
      : "Time and time percentages.";
    stringArrayResults.unshift(dateString);

    return stringArrayResults;
  } catch (error: any) {
    return errorMessage(error);
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
    return errorMessage(error);
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
    return errorMessage(error);
  }
};
