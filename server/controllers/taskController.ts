import { Request, Response, NextFunction } from "express";
import { checkUserExistsID } from "../services/authServices";
import {
  createNewTaskName,
  findAllTaskNames,
  addNewTaskWithHours,
  deleteTaskName,
  deleteTaskWithHours,
  findTasksByDate,
  getTasksFromDates,
  deleteTasksFromDate,
  deleteTaskFromDateRange,
  findOneTaskName,
  findOneTaskNameById,
} from "../services/taskServices";
import AppError from "../utils/AppError";
import catchAsync from "../utils/catchAsync";

exports.addNewTaskName = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const taskName = req.body.taskName;
  const userID = req.body.user.id;
  const maxNumberAllowed = 5;

  if (userID === "" || null) throw new AppError("User is not logged in.", 500);
  if (taskName === "" || null) throw new AppError("Task name was invalid or missing", 500);

  //! Check if user is a member and if the task number has reached its max.
  const usersTaskNames = await findAllTaskNames(userID);
  if (usersTaskNames.rows.length > maxNumberAllowed)
    throw new AppError(
      "Max number of tasks added. If you would like to add more task names, please upgrade to a premium account!",
      500
    );

  // Check if the user has already saved this name (stop dupicates).
  const checkExisting = await findOneTaskName(taskName);
  if (checkExisting.rows[0] && checkExisting.rows[0].userid === userID)
    throw new AppError("You already have a task name with this name.", 500);

  const createdTask = await createNewTaskName(userID, taskName);

  res.json({
    status: "success",
    data: createdTask,
  });
});

exports.getAllTaskNames = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.body.user.id;
  if (userID === "" || null) throw new AppError("User is not logged in.", 500);

  const taskNames = await findAllTaskNames(userID);
  if (!taskNames) throw new AppError("Unknown Error. Please try again.", 500);

  res.json({
    status: "success",
    data: taskNames,
  });
});

exports.deleteTaskName = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const taskID = req.body.taskID;
  if (!taskID) throw new AppError("Task ID not found, please enter a correct ID", 500);

  const taskNameDelete = await deleteTaskName(taskID);

  res.json({
    status: "success",
    data: taskNameDelete,
  });
});

exports.addNewTaskHours = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.body.user.id;
  const user = await checkUserExistsID(userID);
  const todaysDate = new Date(Date.now()).toISOString().slice(0, 10);
  const todaysTasks = await findTasksByDate(todaysDate, userID);

  // Check if user has posted the max number of tasks for today if free member.
  if (todaysTasks.rows.length > 5 && !user.rows[0].ismember)
    throw new AppError(
      "You have reached the limit for task names. Please upgrade your account to premium to unlock unlimited names.",
      500
    );

  const getTaskName = await findOneTaskNameById(req.body.taskID);
  if (!getTaskName.rows[0].taskname) throw new AppError("Could not find task ID. Please try again.", 500);
  const taskName = getTaskName.rows[0].taskname;

  const addTask = await addNewTaskWithHours(userID, taskName, req.body.taskHours);
  if (!addTask) throw new AppError("Could not add task. Please try again", 500);

  res.json({
    status: "success",
    data: addTask,
  });
});

exports.deleteTaskWithHours = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const taskID = req.body.taskID;
  if (!taskID) throw new AppError("Task ID not found, please enter a correct ID", 500);

  const deleteTask = await deleteTaskWithHours(taskID);

  res.json({
    status: "success",
    data: deleteTask,
  });
});

exports.getTasksOnDate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.body.user.id;
  if (userID === "" || null) throw new AppError("User is not logged in.", 500);

  const dateQuery = req.body.date;
  if (dateQuery === "" || null) throw new AppError("Date was not provided.", 500);

  const foundTasks = await findTasksByDate(dateQuery, userID);

  res.json({
    status: "success",
    data: foundTasks,
  });
});

exports.getTasksFromDateRange = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.body.user.id;
  if (userID === "" || null) throw new AppError("User is not logged in.", 500);

  const dateFrom = req.body.dateFrom;
  const dateTo = req.body.dateTo;
  if (dateFrom === "" || null) throw new AppError("Dates were not provided.", 500);
  if (dateTo === "" || null) throw new AppError("Dates were not provided.", 500);

  const foundTasks = await getTasksFromDates(dateFrom, dateTo, userID);

  res.json({
    status: "success",
    data: foundTasks,
  });
});

exports.deleteTasksOnDate = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.body.user.id;
  if (userID === "" || null) throw new AppError("User is not logged in.", 500);

  const dateQuery = req.body.date;
  if (dateQuery === "" || null) throw new AppError("Date was not provided.", 500);

  const deletedTasks = await deleteTasksFromDate(dateQuery, userID);

  res.json({
    status: "success",
    data: deletedTasks,
  });
});

exports.deleteTasksFromDateRange = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const userID = req.body.user.id;
  if (userID === "" || null) throw new AppError("User is not logged in.", 500);

  const dateFrom = req.body.dateFrom;
  const dateTo = req.body.dateTo;
  if (dateFrom === "" || null) throw new AppError("Dates were not provided.", 500);
  if (dateTo === "" || null) throw new AppError("Dates were not provided.", 500);

  const deletedTasks = await deleteTaskFromDateRange(dateFrom, dateTo, userID);

  res.json({
    status: "success",
    data: deletedTasks,
  });
});
