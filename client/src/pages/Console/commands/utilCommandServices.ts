import { helpScreenText, aboutText } from "../constants/text";
import { ICommandInitalObject } from "../../../types/types";
import { ITaskObject } from "../types/types";

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

export const errorMessage = (error: any) => {
  const err = error.response;
  if (err.data.message) return [`Error. ${err.data.message}`];
  return ["Unknown Error, please try again."];
};

export const calculatePercentages = (itemsArray: Array<ITaskObject>) => {
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
