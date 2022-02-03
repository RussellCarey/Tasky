const rateLimit = require("express-rate-limit");

export const createRouteLimit = (minutes: number, maxRequests: number, message: string) => {
  return rateLimit({
    windowMs: minutes * 60 * 1000, // 60 minutes
    max: maxRequests, // limit each IP to X amount requests per windowMs
    message: message,
  });
};
