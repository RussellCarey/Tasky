import { Response, NextFunction } from "express";
import { IReqWithBody } from "../types/types";
import { Schedule } from "../models/ScheduleClass";
import { IJobFromDB } from "../types/types";

const Cryptr = require("cryptr");
const cryptr = new Cryptr(`${process.env.CRYPT}`);
const pool = require("../utils/pgdb");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const MediaController = require("../controllers/mediaController");
const DatabaseServies = require("../services/databaseServices");

// On when login is succsesful.......
exports.uploadTweet = catchAsync(async (req: IReqWithBody, res: Response, next: NextFunction) => {
  // Check we were able to get a user through login and save..
  if (!req.body || !req.user) return next(new AppError("No body or user", 400));

  // Need to get the users codes from the DB to send..
  const userDataObject = DatabaseServies.getUserData(req.user.id);

  const { display_name, twitter_id, email } = userDataObject;
  const { message, unix, imageURL, imageName } = req.body;
  const unixNumber = +unix;

  const access: string = await cryptr.decrypt(userDataObject.access_token);
  const refresh: string = await cryptr.decrypt(userDataObject.refresh_token);

  // We pass in null at the end as this is  NEW job, it doesnt have an ID yet from UUID
  Schedule.createNewJob(
    twitter_id,
    email,
    display_name,
    message,
    unixNumber,
    imageURL,
    imageName,
    access,
    refresh,
    true,
    null
  );

  // Get all jobs here to send back to the client - verifies it matches that on the DB..
  const allJobs = await DatabaseServies.getAllUsersJobs(twitter_id);
  const rows = allJobs.rows.filter((jobs: IJobFromDB) => jobs.is_active !== false && jobs.status !== "success");
  allJobs.rows = rows;

  res.json({
    status: "success",
    jobs: allJobs,
  });
});

// Get all users jobs..
exports.getAllJobs = catchAsync(async (req: IReqWithBody, res: Response, next: NextFunction) => {
  const twitterID = req.user.id;
  if (!twitterID) next(new AppError("No user found..", 400));

  // Get job list and filter out this that are success and inactive. (Finished with no errors...)
  const allJobs = await DatabaseServies.getAllUsersJobs(twitterID);
  const rows = allJobs.rows.filter((jobs: IJobFromDB) => jobs.is_active !== false);
  allJobs.rows = rows;

  res.json({
    status: "success",
    data: allJobs,
  });
});

// Delete a job..
exports.deleteJob = catchAsync(async (req: IReqWithBody, res: Response, next: NextFunction) => {
  const jobID = req.body.jobID;
  if (!jobID) next(new AppError("Job ID not supplied", 400));

  //! THIS IS DB CHANGE IT..
  let imageName;
  const foundItem = await DatabaseServies.getOneJob(jobID);
  if (foundItem.rows.length > 0) imageName = foundItem.rows[0].image_name;

  // Remove from schedule object, DB and Image..
  Schedule.deleteJobFromQueue(jobID);

  // Delete image from space
  MediaController.deleteFileFromSpace(imageName);

  // Set Job to inactive in the DB (not visible to user but stays on the DB..
  DatabaseServies.setJobToInactive(jobID);

  res.json({
    status: "success",
    job_id: jobID,
  });
});
