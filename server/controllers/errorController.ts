import { Response, Request, NextFunction } from "express";
import { IError } from "../types/types";

const sendErrorDev = (err: IError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Improve this further..
const sendProductionError = (err: IError, res: Response) => {
  res.status(err.statusCode).json({
    code: err.statusCode,
    status: err.status,
    message: "Something went wrong on our end! Please try again",
  });
};

module.exports = (err: IError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log("This error is from the error controller. BEEP BEEP BOOP BOOP");
  console.log(err);
  console.log(err.stack);

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    sendProductionError(err, res);
  }
};
