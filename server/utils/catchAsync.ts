import { Request, Response, NextFunction } from "express";

module.exports = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
