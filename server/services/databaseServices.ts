const pool = require("../utils/pgdb");
import { ITwitterProfile } from "../types/types";
import { Query, QueryResult } from "pg";
import { TweetJobClass } from "../models/TweetClass";

export const getUserData = async (id: string) => {
  // Need to get the users codes from the DB to send..
  const userData = await pool.query(`SELECT * from users WHERE twitter_id = $1`, [id]);
  return userData.rows[0];
};

// Set job to inactive in the databsae - so it doesnt send a tweet or appear in UI.
export const setJobToInactive = async (id: string) => {
  const editedJob = await pool.query(`UPDATE jobs SET is_active = $1 WHERE job_id = $2`, [false, id]);
  return editedJob;
};

// Grab one job..
export const getOneJob = async (id: string) => {
  const foundJob = await pool.query(`SELECT * from jobs WHERE job_id = $1`, [id]);
  return foundJob;
};

// Get all user jobs from the DB (for one user only)
export const getAllUsersJobs = async (twitterID: string) => {
  const allJobs = await pool.query(`SELECT * from jobs WHERE user_twitter_id = $1 `, [twitterID]);
  return allJobs;
};

// Upload one job to the DB..
export const uploadOneJob = async (self: TweetJobClass, twitterID: number) => {
  const uploadedJob = await pool.query(
    `INSERT INTO jobs (job_id, user_twitter_id, message, date, image_url, image_name, status) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [self.id, twitterID, self.message, self.date, self.imageURL, self.imageName, "pending"]
  );
  return uploadedJob;
};

// Change a job status, eg pending, success, failed..
export const changeJobStatus = async (tweetObject: TweetJobClass, status: string) => {
  const editedJob = await pool.query(`UPDATE jobs SET status = $1 WHERE job_id = $2`, [status, tweetObject.id]);
  return editedJob;
};

// Upload new using infomation to the DB
export const uploadNewUser = async (
  profile: ITwitterProfile,
  encryptedAccessToken: string,
  encryptedRefreshToken: String
) => {
  const uploadedUser: Query = await pool.query(
    `INSERT INTO users (twitter_id, display_name, profile_img, email, location, access_token, refresh_token ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      profile.id,
      profile.displayName,
      profile._json.profile_image_url,
      profile._json.email,
      profile._json.location,
      encryptedAccessToken,
      encryptedRefreshToken,
    ],
    (err: Error, result: QueryResult) => {
      if (err) console.log(err);
      console.log(result);
    }
  );

  return uploadedUser;
};

// Check if a user exists by ther unique twitter ID>
export const checkUserExists = async (twitterID: string) => {
  const user = await pool.query("SELECT twitter_id FROM users WHERE twitter_id = $1", [twitterID]);
  return user.rowCount < 1 ? false : true;
};

// Get jobs for today only..
export const getTodaysJobs = async () => {
  // Get the current time in UNIX and another one day later..
  const nowDate = Math.floor(Date.now() / 1000);
  const oneDate = Math.floor(Date.now() / 1000 + 3600 * 1000 * 24);

  // Get todays jobs based on one day from now..
  const todaysJobs = await pool.query(
    `SELECT * FROM jobs JOIN users ON users.twitter_id = user_twitter_id WHERE date > $1 AND date < $1 + $2`,
    [nowDate, oneDate]
  );

  return todaysJobs;
};
