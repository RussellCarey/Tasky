import { ScheduleClass } from "../models/ScheduleClass";
import { IJobFromDB } from "../types/types";

const Cryptr = require("cryptr");
const cryptr = new Cryptr(`${process.env.CRYPT}`);

// Parse auth tokens
export const parseDateTokensCreateJob = (self: ScheduleClass, jobs: IJobFromDB) => {
  const accessToken = cryptr.decrypt(jobs.access_token);
  const refreshToken = cryptr.decrypt(jobs.refresh_token);

  // We can pass in the job.id here as we only use this function to create an exisiting job..
  self.createNewJob(
    jobs.twitter_id,
    jobs.email,
    jobs.display_name,
    jobs.message,
    jobs.date,
    jobs.image_url,
    jobs.image_name,
    accessToken,
    refreshToken,
    false,
    jobs.job_id
  );
};
