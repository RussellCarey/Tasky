import { Request, Response, NextFunction, CookieOptions } from "express";
import { createNewTaskName, findAllTaskNames, addNewTaskWithHours } from "../services/taskServices";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";

exports.addNewTaskName = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const taskName = req.body.taskName;
  const userID = req.body.user.id;

  if (userID === "" || null) return new AppError("User is not logged in.", 500);
  if (taskName === "" || null) return new AppError("Task name was invalid or missing", 500);

  const createdTask = await createNewTaskName(userID, taskName);

  res.json({
    status: "success",
    data: createdTask,
  });
});

exports.getAllTaskNames = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.body.user.id;
  if (userID === "" || null) return new AppError("User is not logged in.", 500);
  console.log(userID);

  const taskNames = await findAllTaskNames(userID);
  if (!taskNames) return new AppError("Unknown Error. Please try again.", 500);
  console.log(taskNames);

  res.json({
    status: "success",
    data: taskNames,
  });
});

exports.addNewTaskHours = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.body.user.id;

  // userid taskid hours
  const addTask = await addNewTaskWithHours(userID, req.body.taskID, req.body.taskHours);

  if (!addTask) return new AppError("Could not add task. Please try again", 500);

  res.json({
    status: "success",
    data: addTask,
  });
});
