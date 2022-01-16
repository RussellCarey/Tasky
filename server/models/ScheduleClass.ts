import { IJobFromDB } from "../types/types";
import { TweetJobClass } from "./TweetClass";
import { Job } from "node-schedule";

const schedule = require("node-schedule");
const ScheduleServices = require("../services/scheduleClassServices");
const DatabaseServices = require("../services/databaseServices");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// Future notes
// ------------------------------------------------------------------------------
// Tried using classes here but should have kept with functional programming.
// I need to learn about OOP / others before I try to implement code like this..
// Future plan.
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

export class ScheduleClass {
  private todaysPosts: Array<TweetJobClass>;
  private scheduleData: Job | null;

  constructor() {
    this.todaysPosts = [];
    this.scheduleData = null;
    this.setupJobGetter(this);
  }

  setupJobGetter = async (self: ScheduleClass) => {
    // Get todays jobs from the DB..
    const todaysJobs: Array<IJobFromDB> = await this.getTodaysJobs();

    // Gets todays jobs on restart...
    try {
      todaysJobs.forEach((jobs: IJobFromDB) => {
        ScheduleServices.parseDateTokensCreateJob(this, jobs);
      });
    } catch (error) {
      // Loop through and fail the on the DB??? -- Restart
      console.log("ERROR FROM SETUP JOB GETTER");
      console.log(error);
    }

    // Create the schedule object.. Get new days jobs..
    this.scheduleData = schedule.scheduleJob("0 0 * * *", async function () {
      try {
        todaysJobs.forEach((jobs) => {
          ScheduleServices.parseDateTokensCreateJob(self, jobs);
        });
      } catch (error) {
        // Loop through and fail the on the DB???
        console.log("ERROR FROM SCHEDULED DATA IN SCHEDULE CLASS");
        console.log(error);
      }
    });
  };

  //! Maybe not get all from the join and only what I need..
  private getTodaysJobs = async () => {
    // Upload new JOB to DB..
    const todaysJobs = await DatabaseServices.getTodaysJobs();
    return todaysJobs.rows;
  };

  // Filter out the job that needs deleting..
  deleteJobFromQueue = (id: string) => {
    // Cancel job from the scheduler
    const job = this.todaysPosts.find((item) => item.id === id);

    if (job) {
      // Cancel from the scheduler.
      job.cancelJob();
    }

    // Remove from this object queue..
    const jobFilter = this.todaysPosts.filter((item) => item.id !== id);
    this.todaysPosts = jobFilter;
  };

  // When wrapped in async and catch async it didnt  work..
  //prettier-ignore
  createNewJob = (
    twitterID: number, twitterEmail: string, twitterName: string, message: string, date: number, imageURL: string, imageName: string, access: string, refresh: string, isNew: boolean, id: string | null
  ) => {
    const jobID = id ? id : null;
    const newJob = new TweetJobClass(this, twitterID, twitterEmail, twitterName, message, date, imageURL, imageName, access, refresh, isNew, jobID);
    this.todaysPosts.push(newJob);
    return newJob;
  };
}

export const Schedule = new ScheduleClass();
