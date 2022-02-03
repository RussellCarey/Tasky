import express from "express";
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
import helmet from "helmet";

import isDev from "../utils/isDev";
import { IReqBodyRaw } from "../types/types";

const app = express();
const cors = require("cors");

const whiteListDev = ["localhost:3000", "http://localhost:3000", "http://127.0.0.1:3000"];
const whiteListProd = [
  "https://tasky.russell-carey.com",
  "https://tasky.russell-carey.com/taskyapi",
  "https://www.tasky.russell-carey.com",
];

// Main server and middleware / parsers
export const createServer = () => {
  //
  app.use(
    cors({
      origin: isDev() ? whiteListDev : whiteListProd,
      credentials: true,
    })
  );

  app.use(helmet());
  app.use(cookieParser());

  // Doubles ram usage for every request - maybe find a better way.
  app.use(
    bodyParser.json({
      // limit: "1mb",
      verify: (req: IReqBodyRaw, res: Response, buf: any) => {
        req.rawBody = buf;
      },
    })
  );

  return app;
};
