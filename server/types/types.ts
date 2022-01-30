import { Request } from "express";

export interface ILoginData {
  email: string;
  username: string;
}

export interface IError extends Error {
  status: string;
  statusCode: number;
  isOperational: boolean;
}

export interface IReqBodyRaw extends Request {
  rawBody: JSON;
}
