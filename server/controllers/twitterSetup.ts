import { Strategy } from "passport-twitter";
import { ITwitterProfile } from "../types/types";
import { checkUserExists, createNewUser } from "../services/createNewUser";
import isDev from "../utils/isDev";
import { sendWelcomeEmail } from "./emailController";

const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;

const newTwitterStrategy: Strategy = new TwitterStrategy(
  {
    consumerKey: isDev() ? process.env.CONSUMER_API : process.env.PROD_CONSUMER_API,
    consumerSecret: isDev() ? process.env.CONSUMER_SECRET_KEY : process.env.PROD_CONSUMER_SECRET_KEY,
    callbackURL: isDev() ? process.env.CALLBACK_URL_DEV : process.env.PROD_CALLBACK_URL,
    userProfileURL: process.env.PROFILE_URL,
  },
  async (accessToken: string, refreshToken: string, profile: ITwitterProfile, done: any) => {
    // Check if user exists and create if needed..
    const foundProfile = await checkUserExists(profile.id);

    // If no profile, create a new one and send welcome email to that user..
    if (!foundProfile) {
      await createNewUser(profile, accessToken, refreshToken);
      await sendWelcomeEmail(profile.displayName, profile.emails[0].value);
    }
    return done(null, profile);
  }
);

passport.use(newTwitterStrategy);

passport.serializeUser((user: Object, done: any) => {
  return done(null, user);
});

passport.deserializeUser((user: Object, done: any) => {
  return done(null, user);
});
