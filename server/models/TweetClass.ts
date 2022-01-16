import { Job } from "node-schedule";
import { EEmailType } from "../types/enums";
import { ScheduleClass } from "./ScheduleClass";

const Twit = require("twit");
const { v4: uuidv4 } = require("uuid");
const fetch64 = require("fetch-base64");
const schedule = require("node-schedule");

const catchAsync = require("../utils/catchAsync");

const TweetClassServices = require("../services/tweetClassServices");
const DatabaseServices = require("../services/databaseServices");
const MediaController = require("../controllers/mediaController");
import { sendWelcomeEmail, sendFailedEmail } from "../controllers/emailController";

export class TweetJobClass {
  private twitterID: number;
  private twitterEmail: string;
  private twitterName: string;
  id: string | null;
  message: string;
  date: number;
  imageURL: string | null;
  imageName: string;
  private accessToken: string;
  private refreshToken: string;
  private scheduleManager: ScheduleClass;
  private scheduledData: Job | null;
  private isNew: boolean;

  constructor(
    scheduleManager: ScheduleClass,
    twitterID: number,
    twitterEmail: string,
    twitterName: string,
    message: string,
    date: number,
    imageURL: string | null,
    imageName: string,
    access: string,
    refresh: string,
    isNew: boolean,
    id: string | null
  ) {
    this.isNew = isNew;
    this.message = message;
    this.twitterID = twitterID;
    this.twitterEmail = twitterEmail;
    this.twitterName = twitterName;
    this.id = id ? id : uuidv4();
    this.date = date;
    this.imageURL = imageURL;
    this.imageName = imageName;
    this.accessToken = access;
    this.refreshToken = refresh;
    this.scheduleManager = scheduleManager;
    this.scheduledData = null;
    this.createScedule(this);
  }

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
  // ------------------------------------------------------------------------------

  // Change status in the database to failed and remove it from the job que (if there)..
  private failedAttempt = async (error: any) => {
    console.log("ERROR FROM FAILED ATTEMPT FUNCTION");
    console.log(error);

    await DatabaseServices.changeJobStatus(this.id, "failed");
    await this.scheduleManager.deleteJobFromQueue(this.id!);

    // Send failed email to user.
    await sendFailedEmail(this.twitterName, this.twitterEmail, this.message);
  };

  // Cancel a job from the scheulder..
  cancelJob = () => {
    // Cancel job so stop any re activations..
    this.scheduledData ? this.scheduledData.cancel() : null;
  };

  // Create the job into the scheduler..
  private createScedule = catchAsync(async (self: TweetJobClass) => {
    console.log(`created new schedule for message ${this.message} at time ${new Date(this.date)}`);
    console.log(`and its codes are ${self.accessToken} and ${self.refreshToken}`);

    // Convert date to CRON format - from the DB and front end is a normal date.
    const formattedDate = TweetClassServices.convertDateToCronDate(this.date);

    // If this is a NEW creation, then we need to save it to the database..
    if (this.isNew) {
      TweetClassServices.createNewDBJob(this, this.twitterID);
    }

    // Create the schedule object..
    this.scheduledData = schedule.scheduleJob(formattedDate, async function () {
      const Twitter = TweetClassServices.NewTwit(self.accessToken, self.refreshToken);
      if (!self.imageURL) return await self.twitterPostTweet(Twitter);
      if (self.imageURL) return await self.postImageTweet(Twitter);
    });
  });

  // Promise for uploading media file before posting the tweet..
  private twitterMediaUpload = async (Twitter: typeof Twit) => {
    const imageBase64 = await fetch64.remote(this.imageURL);
    const twitterMediaUpload = await Twitter.post("media/upload", { media_data: imageBase64 });
    return twitterMediaUpload;
  };

  // Promise to post the tweet with media..
  private twitterPostTweetWithImage = async (mediaData: any, Twitter: typeof Twit) => {
    console.log(`Posting a tweet with message ${this.message} and time ${this.date}`);
    const twitterPostWithImage = Twitter.post("statuses/update", {
      status: `${this.message}`,
      media_ids: mediaData.data.media_id_string,
    });
    return twitterPostWithImage;
  };

  //! Posting a single tweet
  private twitterPostTweet = async (Twitter: typeof Twit) => {
    console.log("Posting NON image tweet");
    try {
      // Attempt to send a tweet.
      const tweetPost = await Twitter.post("statuses/update", { status: `${this.message}` });
      if (tweetPost.resp.statusMessage !== "OK") this.failedAttempt(tweetPost.resp);

      // Set the status on the DB to success and delete from the servers object..
      await DatabaseServices.changeJobStatus(this, "success");

      //! Testing - Email user when posted..
      //   type: subject: username: message: date
      await sendWelcomeEmail(this.twitterName, this.twitterEmail);

      // Delete from queue in schedule manager..
      this.scheduleManager.deleteJobFromQueue(this.id!);
    } catch (error) {
      return this.failedAttempt(error);
    }
  };

  //!  Main function to post image tweet..
  private postImageTweet = async (Twitter: typeof Twit) => {
    console.log("Posting image tweet");
    try {
      // Post and upload the media

      const mediaUploadAttempt: any = await this.twitterMediaUpload(Twitter);
      if (mediaUploadAttempt.resp.statusMessage !== "OK") this.failedAttempt(mediaUploadAttempt.resp);

      // Using the media above, post a text tweet with the image
      const postAttempt: any = await this.twitterPostTweetWithImage(mediaUploadAttempt, Twitter);
      if (postAttempt.resp.statusMessage !== "OK") this.failedAttempt(postAttempt.resp);

      // If okay, change on the DB
      await DatabaseServices.changeJobStatus(this, "success");

      // Delete from the image space..
      await MediaController.deleteFileFromSpace(this.id);

      // Delete from queue in schedule manager..
      this.scheduleManager.deleteJobFromQueue(this.id!);
    } catch (error) {
      return this.failedAttempt(error);
    }
  };
}
