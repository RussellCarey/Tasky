import {
  addNewTaskNameAttempt,
  getTaskNames,
  addNewTaskHours,
  deleteTaskName,
  deleteTaskWithHours,
  getTasksOnDate,
  getTasksFromDateRange,
  deleteTasksDate,
  deleteTasksFromDateRange,
} from "../services/dbTaskServices";

import { errorMessage, calculatePercentages } from "./utilCommandServices";
import { ICommandInitalObject } from "../../../types/types";

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

    // Return the task name along with its ID which the user needs to input.
    const tasksSentences = taskNamesList.data.data.rows.map((task: any, ind: any) => {
      return `[${task.id}] ${task.taskname}`;
    });

    // If the user has no presaved tasks.
    if (tasksSentences.length === 0)
      return ["You have no saved task names. Add some using `add new task name (name)`."];

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

    return ["Task was added!"];
  } catch (error: any) {
    return errorMessage(error);
  }
};

export const deleteTask = async (commandObject: ICommandInitalObject) => {
  try {
    const taskID = Number(commandObject.args[0]);

    const deleteTaskAndData = await deleteTaskWithHours(taskID);

    return ["Task was deleted!"];
  } catch (error: any) {
    return errorMessage(error);
  }
};

export const showTasksOnDate = async (commandObject: ICommandInitalObject) => {
  try {
    if (commandObject.args.length > 1) return ["Too many arguments provided."];
    const date = commandObject.args[0];

    // Get single days tasks..
    const daysTasks = await getTasksOnDate(date);
    if (daysTasks.data.data.rows.length === 0) return ["Sorry, you have no tasks saved for this date."];

    // Convert the data into an object where each task is collected. Data is task name, hours, percetage.
    const percetangesAndCollection = calculatePercentages(daysTasks.data.data.rows);

    // Convert above object into an array. Return string with data to return to console.
    const stringArrayResults: Array<string> = Object.entries(percetangesAndCollection).map((data: any) => {
      return `${data[1].taskname} for ${data[1].hours} hours. [${Math.round(data[1].percentage)}%]`;
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

    // Convert above object into an array. Return string with data to return to console.
    const stringArrayResults: Array<string> = Object.entries(percetangesAndCollection).map((data: any) => {
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
