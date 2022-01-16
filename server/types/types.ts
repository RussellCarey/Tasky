import { Profile } from "passport";
import { Session } from "express-session";
import { StringMappingType } from "typescript";

export interface ITwitterProfile extends Profile {
  id: string;
  username: string;
  displayName: string;
  emails: Array<{ value: string }>;
  photos: Array<{ value: string }>;
  id_str: string;
  location: string;
  _json: { location: string; profile_image_url: string; email: string };
}

export interface IReqWithBody {
  body: IPostBody;
  user: ITwitterProfile;
  files: any;
}

export interface IPostBody extends Request {
  message: string;
  unix: string;
  accessToken: string;
  refreshToken: string;
  jobID: string;
  imageURL: string;
  imageName: string;
}

export interface IRequestWithUser extends Request {
  user: ITwitterProfile;
}

export interface ITwitterUserObject {
  id: string;
  username: string;
  displayName: string;
  email: string;
  profileImage: string;
}

export interface IError extends Error {
  status: string;
  statusCode: number;
}

export interface ISessionRequest extends Request {
  session: Session;
}

//! NOT GOOD
export interface IJobFromDB {
  job_id: string | null;
  twitter_id: number;
  email: string;
  display_name: string;
  status: string;
  message: string;
  date: number;
  image_url: string;
  image_name: string;
  access_token: string;
  refresh_token: string;
  accessToken: string;
  refreshToken: string;
  is_active: boolean;
}

export interface IEmailTemplate {
  to: string;
  firstName: StringMappingType;
  url: string;
  from: string;
}
