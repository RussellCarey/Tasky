import { ITwitterProfile } from "../types/types";

const DatabaseServices = require("../services/databaseServices");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(`${process.env.CRYPT}`);

// Check if a user exists...
export const checkUserExists = async (twitterID: string): Promise<Boolean> => {
  const checkedUser = await DatabaseServices.checkUserExists(twitterID);
  return checkedUser;
};

// Create a new user..
export const createNewUser = async (profile: ITwitterProfile, access: string, refresh: string) => {
  // Encrypt private keys
  const encryptedAccessToken = await cryptr.encrypt(access);
  const encryptedRefreshToken = await cryptr.encrypt(refresh);
  const newUser = await DatabaseServices.uploadNewUser(profile, encryptedAccessToken, encryptedRefreshToken);
  return newUser;
};
